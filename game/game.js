import { range, shuffle } from "lodash";
import $ from "jquery";
// import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./game.css";
import "../public/font/font.css";

const suits = ["club", "diamond", "heart", "spade"];
const values = [...range(1, 11), "king", "queen", "jack"];

class Deck {
  constructor() {
    this.deck = [];
  }

  // Generate a deck of 52 cards
  generateCards() {
    for (let suit of suits) {
      this.deck = [
        ...this.deck,
        ...[...values].map((value) => ({ suit, value })),
      ];
    }
  }

  // Shuffle a deck
  shuffle() {
    this.deck = shuffle(this.deck);
  }
}

class Game {}

// startGame()
function startGame() {
  const newDeck = new Deck();
  newDeck.generateCards();
  console.log(newDeck.deck);
  newDeck.shuffle();
  console.log(newDeck.deck);
  // newDeck.shuffle();

  // Divide the deck in half
  // const halfDeck = Math.ceil(newDeck.numOfCards / 2);
  // Half of deck for Player
  // playerCards = newDeck.deck.slice(0, halfDeck);
  // Half of deck for Computer
  // computerCards = newDeck.deck.slice(halfDeck, newDeck.numOfCards);

  // console.log(playerCards);
  // console.log(computerCards);
}

// const newDeck = new Deck();
// newDeck.shuffle();
// console.log(newDeck.deck);
startGame();
