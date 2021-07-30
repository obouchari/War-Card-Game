import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './game.css';
import '../public/font/font.css';

const suits = ['♠', '♣', '♦', '♥']
const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']
let playerCards, computerCards

class Deck {
    constructor() {
        this.deck = [];

    // Create a deck
        for (let suit in suits) {
            for (let value in values) {
                this.deck.push(`${values[value]} of ${suits[suit]}`);
            }
        }
    }

    get numOfCards() {
        return this.deck.length;
    }

    // Shuffle a deck
    shuffle() {
        let numOfCards = this.deck.length;
        for(let i = numOfCards - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * i);
            let temp = this.deck[i];
            this.deck[i] = this.deck[j];
            this.deck[j] = temp;
        }
        return this;
    }
}

// startGame()
function startGame() {
    const newDeck = new Deck();
    newDeck.shuffle();

    // Divide the deck in half
    const halfDeck = Math.ceil(newDeck.numOfCards / 2);
    // Half of deck for Player
    playerCards = newDeck.deck.slice(0, halfDeck);
    // Half of deck for Computer
    computerCards = newDeck.deck.slice(halfDeck, newDeck.numOfCards);

    console.log(playerCards);
    console.log(computerCards);
}

const newDeck = new Deck();
newDeck.shuffle();
console.log(newDeck.deck);
startGame();



