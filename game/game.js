import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import '../public/font/font.css';

import './game.css';
function range(start, stop, step = 1) {
  return Array(Math.ceil((stop - start) / step))
    .fill(start)
    .map((x, y) => x + y * step);
}

const suits = ['Clubs', 'Diamonds', 'Hearts', 'Spades'];
const values = [...range(2, 11), '11 Jack', '12 Queen', '13 King', '14 Ace'];
let playerCards, computerCards;
const playerNewCards = [];
const computerNewCards = [];
const warCards = [];
let distance = 240000;
let timeLeft;

const topCard = document.getElementById('topcard');
const bottomCard = document.getElementById('bottomcard');
const topText = document.getElementById('toptext');
const centerText = document.getElementById('centerspan');
const bottomText = document.getElementById('bottomtext');
const topArea = document.getElementById('top');
const centerArea = document.getElementById('center');
const bottomArea = document.getElementById('bottom');
const gameBtn = document.getElementById('gamebtn');
const timer = document.getElementById('timer');
const deckmid1 = document.getElementById('deckmid1');
const deckmid2 = document.getElementById('deckmid2');
let isGameOver = false;

// UI: Updates Computer Card during Round
function changeTopCard(computerCard) {
  let cardNumber = parseInt(computerCard);
  if (cardNumber > 10) {
    switch (cardNumber) {
      case 11:
        cardNumber = 'jack';
        break;
      case 12:
        cardNumber = 'queen';
        break;
      case 13:
        cardNumber = 'king';
        break;
      case 14:
        cardNumber = '1';
        break;
    }
  }
  const face = computerCard.split('of ')[1].toLowerCase().slice(0, -1);
  console.log(cardNumber);
  console.log(face);

  topCard.innerHTML = `<img src="../png/${face}_${cardNumber}.png" alt="" class="card img-fluid">`;
  quickFade(topCard);
}

// UI: Updates Player Card during Round
function changeBottomCard(playerCard) {
  let cardNumber = parseInt(playerCard);
  if (cardNumber > 10) {
    switch (cardNumber) {
      case 11:
        cardNumber = 'jack';
        break;
      case 12:
        cardNumber = 'queen';
        break;
      case 13:
        cardNumber = 'king';
        break;
      case 14:
        cardNumber = '1';
        break;
    }
  }

  const face = playerCard.split('of ')[1].toLowerCase().slice(0, -1);
  console.log(cardNumber);
  console.log(face);

  bottomCard.innerHTML = `<img src="../png/${face}_${cardNumber}.png" alt="" class="card img-fluid">`;
  quickFade(bottomCard);
}

// UI: Updates Top Cards at Start of War
function preWarTopCards(computerCard) {
  let cardNumber = parseInt(computerCard);
  if (cardNumber > 10) {
    switch (cardNumber) {
      case 11:
        cardNumber = 'jack';
        break;
      case 12:
        cardNumber = 'queen';
        break;
      case 13:
        cardNumber = 'king';
        break;
      case 14:
        cardNumber = '1';
        break;
    }
  }
  const face = computerCard.split('of ')[1].toLowerCase().slice(0, -1);
  console.log(cardNumber);
  console.log(face);

  topCard.innerHTML = `<img src="../png/${face}_${cardNumber}.png" alt="" class="card img-fluid">`;
  setTimeout(() => {
    topCard.innerHTML = `<img src="../png/back.png" alt="" class="card img-fluid"><img src="../png/back.png" alt="" class="card img-fluid"><img src="../png/back.png" alt="" class="card img-fluid">`;
  }, 1000);
}

// UI: Updates Bottom Cards at Start of War
function preWarBottomCards(playerCard) {
  let cardNumber = parseInt(playerCard);
  if (cardNumber > 10) {
    switch (cardNumber) {
      case 11:
        cardNumber = 'jack';
        break;
      case 12:
        cardNumber = 'queen';
        break;
      case 13:
        cardNumber = 'king';
        break;
      case 14:
        cardNumber = '1';
        break;
    }
  }
  const face = playerCard.split('of ')[1].toLowerCase().slice(0, -1);
  console.log(cardNumber);
  console.log(face);
  bottomCard.innerHTML = `<img src="../png/${face}_${cardNumber}.png" alt="" class="card img-fluid">`;
  setTimeout(() => {
    bottomCard.innerHTML = `<img src="../png/back.png" alt="" class="card img-fluid"><img src="../png/back.png" alt="" class="card img-fluid"><img src="../png/back.png" alt="" class="card img-fluid">`;
  }, 1000);
}

// UI: Updates Text in Center of Game Board
function changeCenterText(msg) {
  centerText.innerHTML = msg;
}

// UI: Updates Top Cards at End of War Round
function warTopCards(computerCard3) {
  let cardNumber = parseInt(computerCard3);
  if (cardNumber > 10) {
    switch (cardNumber) {
      case 11:
        cardNumber = 'jack';
        break;
      case 12:
        cardNumber = 'queen';
        break;
      case 13:
        cardNumber = 'king';
        break;
      case 14:
        cardNumber = '1';
        break;
    }
  }
  const face = computerCard3.split('of ')[1].toLowerCase().slice(0, -1);
  console.log(cardNumber);
  console.log(face);

  topCard.innerHTML = `<img src="../png/back.png" alt="" class="card img-fluid"><img src="../png/back.png" alt="" class="card img-fluid"><img src="../png/${face}_${cardNumber}.png" alt="" class="card img-fluid">`;
  slowFade(topCard);
}

// UI: Updates Bottom Cards at End of War Round
function warBottomCards(playerCard3) {
  let cardNumber = parseInt(playerCard3);
  if (cardNumber > 10) {
    switch (cardNumber) {
      case 11:
        cardNumber = 'jack';
        break;
      case 12:
        cardNumber = 'queen';
        break;
      case 13:
        cardNumber = 'king';
        break;
      case 14:
        cardNumber = '1';
        break;
    }
  }
  const face = playerCard3.split('of ')[1].toLowerCase().slice(0, -1);
  console.log(cardNumber);
  console.log(face);
  bottomCard.innerHTML = `<img src="../png/back.png" alt="" class="card img-fluid"><img src="../png/back.png" alt="" class="card img-fluid"><img src="../png/${face}_${cardNumber}.png" alt="" class="card img-fluid">`;
  slowFade(bottomCard);
}

// UI: Updates display of Computer's Current Number of Cards

function updateComputerCardsNum() {
  const numcards = computerCards.length + computerNewCards.length;
  const computerText = `Computer has ${numcards} cards`;
  topText.innerText = computerText;
}

// UI: Updates display of Player's Current Number of Cards
function updatePlayerCardsNum() {
  const numcards = playerCards.length + playerNewCards.length;
  const playerText = `Player has ${numcards} cards`;
  bottomText.innerText = playerText;
}

// UI: Adds Slower Fade-In using Opacity on Element
function slowFade(element) {
  let opacity = 0.1; // initial opacity
  element.style.display = 'block';
  const timer = setInterval(function () {
    if (opacity >= 1) {
      clearInterval(timer);
    }
    element.style.opacity = opacity;
    element.style.filter = 'alpha(opacity=' + opacity * 100 + ')';
    opacity += opacity * 0.1;
  }, 45);
}

// UI: Adds Quicker Fade-In using Opacity on Element
function quickFade(element) {
  let opacity = 0.1; // initial opacity
  element.style.display = 'block';
  const timer = setInterval(function () {
    if (opacity >= 1) {
      clearInterval(timer);
    }
    element.style.opacity = opacity;
    element.style.filter = 'alpha(opacity=' + opacity * 100 + ')';
    opacity += opacity * 0.1;
  }, 10);
}

// Game: Creates Deck of Cards
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
    for (let i = numOfCards - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * i);
      let temp = this.deck[i];
      this.deck[i] = this.deck[j];
      this.deck[j] = temp;
    }
    return this;
  }
}

// startGame() - Initializes Game and Deals Half of Deck to Player and Computer
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
  runTimer();
}

// Game: Starts Round
function playRound() {
  const playerCard = drawPlayerCard();
  const computerCard = drawComputerCard();
  changeTopCard(computerCard);
  changeBottomCard(playerCard);
  if (!playerCard) {
    evalGameResults();
  } else if (!computerCard) {
    evalGameResults();
  }
  evaluateRoundWinner(playerCard, computerCard);
}

// Game: Evaluates Player and Computer Card and Sends Result to UI
function evaluateRoundWinner(playerCard, computerCard) {
  const playerCardNum = parseInt(playerCard);
  const computerCardNum = parseInt(computerCard);
  let playerCardText = playerCard;
  let computerCardText = computerCard;
  if (playerCardNum > 10) {
    playerCardText = playerCard.substr(3);
  }
  if (computerCardNum > 10) {
    computerCardText = computerCard.substr(3);
  }
  if (playerCardNum > computerCardNum) {
    const msg = `Player wins: ${playerCardText} beats ${computerCardText}`;
    changeCenterText(msg);
    playerNewCards.push(playerCard);
    playerNewCards.push(computerCard);
    updatePlayerCardsNum();
    updateComputerCardsNum();
  } else if (computerCardNum > playerCardNum) {
    const msg = `Computer wins: ${computerCardText} beats ${playerCardText}`;
    changeCenterText(msg);
    computerNewCards.push(playerCard);
    computerNewCards.push(computerCard);
    updatePlayerCardsNum();
    updateComputerCardsNum();
  } else {
    const msg = `WAR! ${playerCardText} ties with ${computerCardText}...<div class="loadingwheel"></div>`;
    gameBtn.style.display = 'none';
    gameBtn.disabled = true;
    updatePlayerCardsNum();
    updateComputerCardsNum();
    preWarTopCards(computerCard);
    preWarBottomCards(playerCard);
    changeCenterText(msg);
    setTimeout(() => {
      war();
    }, 3000);
  }
}

// Game: Draws Card for Player from Player Card Deck
function drawPlayerCard() {
  if (playerCards.length > 0) {
    return playerCards.shift();
  } else if (playerNewCards.length > 0) {
    return playerNewCards.shift();
  } else return;
}

// Game: Draws Card for Computer from Computer Card Deck
function drawComputerCard() {
  if (computerCards.length > 0) {
    return computerCards.shift();
  } else if (computerNewCards.length > 0) {
    return computerNewCards.shift();
  } else return;
}

// Evaluates Results based on who has the most cards - if game is tied; begins 2 minute overtime
function evalGameResults() {
  if (
    playerNewCards.length + playerCards.length >
    computerNewCards.length + computerCards.length
  ) {
    const msg = 'Player has more cards - Player wins!';
    centerText.innerText = msg;
    isGameOver = true;
    gameBtn.disabled = true;
    clearInterval();
  } else if (
    computerNewCards.length + computerCards.length >
    playerNewCards.length + playerCards.length
  ) {
    const msg = 'Computer has more cards - Computer wins!';
    centerText.innerText = msg;
    isGameOver = true;
    gameBtn.disabled = true;
    clearInterval();
  } else {
    const msg = 'Score is Tied - Two Minute Overtime!';
    alert(msg);
    distance = 120000;
  }
}

// Game: Begins War Sequence if Round is Tied
function war() {
  const computerCard1 = drawComputerCard();
  if (computerCard1) {
    warCards.unshift(computerCard1);
  } else {
    evalGameResults();
    return;
  }
  const computerCard2 = drawComputerCard();
  if (computerCard2) {
    warCards.unshift(computerCard2);
  } else {
    evalGameResults();
    return;
  }
  const computerCard3 = drawComputerCard();
  if (computerCard3) {
    warCards.unshift(computerCard3);
  } else {
    evalGameResults();
    return;
  }
  const playerCard1 = drawPlayerCard();
  if (playerCard1) {
    warCards.unshift(playerCard1);
  } else {
    evalGameResults();
    return;
  }
  const playerCard2 = drawPlayerCard();
  if (playerCard2) {
    warCards.unshift(playerCard2);
  } else {
    evalGameResults();
    return;
  }
  const playerCard3 = drawPlayerCard();
  if (playerCard3) {
    warCards.unshift(playerCard3);
  } else {
    evalGameResults();
    return;
  }
  evalWar(computerCard3, playerCard3);
}

function evalWar(computerCard3, playerCard3) {
  const playerCardNum = parseInt(playerCard3);
  const computerCardNum = parseInt(computerCard3);
  let playerCardText = playerCard3;
  let computerCardText = computerCard3;
  if (playerCardNum > 10) {
    playerCardText = playerCard3.substr(3);
  }
  if (computerCardNum > 10) {
    computerCardText = computerCard3.substr(3);
  }
  warTopCards(computerCard3);
  warBottomCards(playerCard3);
  if (playerCardNum > computerCardNum) {
    const msg = `PLAYER WINS THE WAR!!! ${playerCardText} beats ${computerCardText}`;
    changeCenterText(msg);
    addWarCardsToPlayer();
    updatePlayerCardsNum();
    updateComputerCardsNum();
    warCards.length = 0;
    gamebtn.style.display = 'block';
    gameBtn.disabled = false;
  } else if (computerCardNum > playerCardNum) {
    const msg = `COMPUTER WINS THE WAR!!! ${computerCardText} beats ${playerCardText}`;
    changeCenterText(msg);
    addWarCardsToComputer();
    updatePlayerCardsNum();
    updateComputerCardsNum();
    warCards.length = 0;
    gamebtn.style.display = 'block';
    gameBtn.disabled = false;
  } else {
    changeCenterText(
      `ANOTHER WAR?!? Player drew ${playerCardText} and Computer drew ${computerCardText}...<div class="loadingwheel"></div>`
    );
    preWarTopCards(computerCard3);
    preWarBottomCards(playerCard3);
    gameBtn.style.display = 'none';
    gameBtn.disabled = true;
    setTimeout(() => {
      war();
    }, 3000);
  }
}

// Game: Adds cards from War to Player if Player wins War
function addWarCardsToPlayer() {
  warCards.forEach((card) => {
    playerNewCards.push(card);
  });
}

// Game Adds cards from War to Computer if Computer wins War
function addWarCardsToComputer() {
  warCards.forEach((card) => {
    computerNewCards.push(card);
  });
}

// Game and UI: Starts Timer based on Distance (in milliseconds)
function runTimer() {
  setInterval(() => {
    distance = distance - 1000;
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);
    if (distance > 0) {
      timeLeft = `${minutes}m ${seconds}s`;
    } else {
      timeLeft = '0m 0s';
    }
    setTimeout(() => {
      timer.innerText = timeLeft;
    }, 50);
    if (distance <= 0) {
      evalGameResults();
      clearInterval();
      return;
    }
    if (isGameOver === true) {
      clearInterval();
      timer.innerText = 'GAME OVER';
      return;
    }
  }, 1000);
}

// Game: Rests Timer to 4 Minutes - Possible UI Implementation of Reset Button?
function resetTime() {
  distance = 240000;
}

// Game: Initalizes Game on Page Load
const newDeck = new Deck();
newDeck.shuffle();
console.log(newDeck.deck);
startGame();
gameBtn.addEventListener('click', playRound);
if (distance == 0) {
  evalGameResults();
}

// function endGame(msg) {
//   // Pop up alert message
//   alert(msg);
// }
