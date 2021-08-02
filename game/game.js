import {range, shuffle, chunk, random, padStart} from "lodash";
import $ from "jquery";
import {Modal} from "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./game.css";
import "../public/font/font.css";

const suits = ["club", "diamond", "heart", "spade"];
const values = [...range(2, 11), "jack", "queen", "king", "A"];

class Game extends EventTarget {
    constructor(playerName) {
        super();
        this.deck = [];
        this.computerPlayer = {
            name: "Grandma",
            cards: [],
        };

        this.humanPlayer = {
            name: playerName || "Guest",
            cards: [],
        };
    }

    // Generate a deck of 52 cards
    generateCards(suits, values) {
        for (let suit of suits) {
            this.deck = [
                ...this.deck,
                ...[...values].map((value) => ({suit, value})),
            ];
        }
    }

    startGame() {
        const shuffled = shuffle(this.deck);
        const divideHalf = chunk(shuffled, 26);
        this.computerPlayer.cards = divideHalf[0];
        this.humanPlayer.cards = divideHalf[1];

        // Trigger game started event
        this.emit("startGame");
    }

    draw() {
        const playerCard = this.humanPlayer.cards.shift();
        const computerCard = this.computerPlayer.cards.shift();

        this.emit("draw", {playerCard, computerCard});
    }

    checkHandWin(playerCard, computerCard, cardValues) {
        const playerCardStrength = cardValues.indexOf(playerCard.value);
        const computerCardStrength = cardValues.indexOf(computerCard.value);
        let winner;

        if (playerCardStrength > computerCardStrength) {
            // Human player win the cards
            winner = "human";
            this.humanPlayer.cards.push(playerCard, computerCard);
        } else if (computerCardStrength > playerCardStrength) {
            // Computer player win the cards
            winner = "computer";
            this.computerPlayer.cards.push(playerCard, computerCard);
        } else {
            // it's a tie, put cards back in each player deck in a random position
            winner = "tie";
            this.humanPlayer.cards.splice(random(1, this.humanPlayer.cards.length), 0, playerCard);
            this.computerPlayer.cards.splice(random(1, this.computerPlayer.cards.length), 0, computerCard);
        }

        this.emit("winHand", {winner});
    }

    checkGameWin() {
        const humanCardsCount = this.humanPlayer.cards.length;
        const computerCardsCount = this.computerPlayer.cards.length;
        if (humanCardsCount > computerCardsCount) {
            return {winner: "human", cardsCount: humanCardsCount};
        } else if (computerCardsCount > humanCardsCount) {
            return {winner: "computer", cardsCount: computerCardsCount};
        }

        return {winner: "tie"};
    }


    emit(event, data) {
        this.dispatchEvent(new CustomEvent(event, {detail: data}));
    }

    on(event, callBack) {
        this.addEventListener(event, callBack);
    }
}

$(function () {
    const $startGame = $("#start-game");
    const $playerName = $("#player-name-field");
    const $playersCards = $(".players-cards");
    const $player = $("#player");
    const $computer = $("#computer");
    const $gameTable = $("#game-table");
    const $playerDeck = $player.find(".cards");
    const $timer = $('.timer');
    const gameDuration = .1; // game duration in minutes

    let $playerCard;
    let $computerCard;

    const welcomeDialog = new Modal($(".modal"), {
        keyboard: false,
    });

    welcomeDialog.show();

    $startGame.on("submit", (evt) => {
        evt.preventDefault();

        welcomeDialog.hide();
        $playersCards.removeClass("hidden");

        const game = new Game($playerName.val());
        game.generateCards(suits, values);

        game.on("startGame", () => {
            const {humanPlayer, computerPlayer} = game;
            setPlayerName(humanPlayer.name);
            updateCardsCount(humanPlayer.cards.length, computerPlayer.cards.length);
            enablePlayerToDraw();
            showTimer(gameDuration);
            startTimer(game, gameDuration);
        });

        game.on("draw", (evt) => {
            const {humanPlayer, computerPlayer} = game;
            const {playerCard, computerCard} = evt.detail;

            $playerCard = createCard(playerCard);
            $computerCard = createCard(computerCard);

            placeCardsOnTable($playerCard, $computerCard).then(() => game.checkHandWin(playerCard, computerCard, values));

            updateCardsCount(humanPlayer.cards.length, computerPlayer.cards.length);
            preventPlayerToDraw();
        });

        game.on("winHand", evt => {
            const {humanPlayer, computerPlayer} = game;
            const {winner} = evt.detail;

            switch (winner) {
                case "human":
                    moveCards("to-left", $playerCard, $computerCard);
                    break;
                case "computer":
                    moveCards("to-right", $playerCard, $computerCard);
                    break;
                case "tie":
                default:
                    moveCards("to-left", $playerCard);
                    moveCards("to-right", $computerCard);
            }

            updateCardsCount(humanPlayer.cards.length, computerPlayer.cards.length);
            enablePlayerToDraw();
        });

        game.on('gameOver', evt => {
            console.log("Game is over")
            preventPlayerToDraw();
        })

        $playerDeck.on("click", () => {
            if ($playerDeck.hasClass("focus")) {
                game.draw();
            }
        });

        game.startGame();
    });

    function startTimer(game, duration = 10) {
        let count = duration * 60; // count in seconds
        const intervalId = setInterval(() => {
            updateTimer(count);
            if (count === 0) {
                game.emit('gameOver');
                clearInterval(intervalId);
            } else {
                count = count - 1;
            }
        }, 1000);
    }

    // Functions to update the UI
    function setPlayerName(playerName) {
        $player.find(".player-name").text(playerName);
    }

    function updateCardsCount(humanCardsCount, computerCardsCount) {
        setCardsLeft($player, humanCardsCount);
        setCardsLeft($computer, computerCardsCount);
    }

    function showTimer(duration) {
        updateTimer(duration * 60);
        $timer.removeClass("hidden");
    }

    function updateTimer(duration) {
        const minutes = parseInt((duration / 60).toString());
        const seconds = duration % 60;
        $timer.text(`${padStart(minutes.toString(), 2, '0')}:${padStart(seconds.toString(), 2, '0')}`);
    }

    function setCardsLeft($element, count) {
        $element
            .find(".cards-left")
            .text(`(${count} Card${count > 1 ? "s" : ""} left)`);
    }

    function createCard(card) {
        const {suit, value} = card;
        const $card = $(document.createElement("img"));
        const imgName = `${suit}_${value === "A" ? 1 : value}`;
        $card.attr({
            srcset: `/png/2x/${imgName}.png 2x, /png/1x/${imgName}.png 1x`,
            src: `/png/1x/${imgName}.png`,
            alt: imgName,
        });

        $card.addClass("placed");

        return $card;
    }

    function placeCardsOnTable(...$cards) {
        return new Promise((resolve) => {
            $gameTable.html($cards);
            // Remove placed class to trigger the CSS animation
            setTimeout(() => {
                $cards.map(($card) => $card.removeClass("placed"));
            }, 100);
            setTimeout(() => {
                resolve();
            }, 900);
        });
    }

    function moveCards(direction, ...$cards) {
        $cards.map($card => $card.addClass(direction))
        setTimeout(() => {
            $cards.map($card => $card.remove());
        }, 500);
    }

    function enablePlayerToDraw() {
        setTimeout(() => {
            $playerDeck.addClass("focus");
        }, 500);
    }

    function preventPlayerToDraw() {
        if ($playerDeck.hasClass("focus")) {
            $playerDeck.removeClass("focus");
        } else {
            // Wait for other processes that also update $playerDeck css class
            console.log("Already disabled")
            setTimeout(() => {
                console.log("called after 1s")
                $playerDeck.removeClass("focus");
            }, 1000);
        }
    }
});
