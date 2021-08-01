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
const values = [
  '2 Two',
  '3 Three',
  '4 Four',
  '5 Five',
  '6 Six',
  '7 Seven',
  '8 Eight',
  '9 Nine',
  '10 Ten',
  '11 Jack',
  '12 Queen',
  '13 King',
  '14 Ace',
];

let playerCards, computerCards;
const playerNewCards = [];
const computerNewCards = [];
const warCards = [];
let distance = 240000;
let timeLeft;
let time;

const topCard = document.getElementById('topcard');
const bottomCard = document.getElementById('bottomcard');
const topText = document.getElementById('toptext');
const centerSpan = document.getElementById('centerspan');
const bottomText = document.getElementById('bottomtext');
const topArea = document.getElementById('top');
const centerArea = document.getElementById('center');
const bottomArea = document.getElementById('bottom');
const gameBtn = document.getElementById('gamebtn');
const resetBtn = document.getElementById('resetbtn');
const timer = document.getElementById('timer');
const deckmid1 = document.getElementById('deckmid1');
const deckmid2 = document.getElementById('deckmid2');
let isGameOver = false;

// Card Source: https://code.google.com/archive/p/vector-playing-cards/
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

  topCard.innerHTML = `<img src="../png/${face}_${cardNumber}.png" alt="" class="card img-fluid">`;
  // moveTopCard();
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

  bottomCard.innerHTML = `<img src="../png/${face}_${cardNumber}.png" alt="" class="card img-fluid">`;
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

  topCard.innerHTML = `<img src="../png/${face}_${cardNumber}.png" alt="" class="card img-fluid">`;
  setTimeout(() => {
    topCard.innerHTML = `<img src="../png/back.png" alt="" class="card img-fluid"><img src="../png/back.png" alt="" class="card img-fluid"><img src="../png/back.png" alt="" class="card img-fluid">`;
    slowFade(topCard);
  }, 1500);
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
  bottomCard.innerHTML = `<img src="../png/${face}_${cardNumber}.png" alt="" class="card img-fluid">`;
  setTimeout(() => {
    bottomCard.innerHTML = `<img src="../png/back.png" alt="" class="card img-fluid"><img src="../png/back.png" alt="" class="card img-fluid"><img src="../png/back.png" alt="" class="card img-fluid">`;
    slowFade(bottomCard);
  }, 1500);
}

// UI: Updates Text in Center of Game Board
function updateCenterSpan(msg) {
  centerSpan.innerHTML = msg;
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

  topCard.innerHTML = `<img src="../png/back.png" alt="" class="card img-fluid"><img src="../png/back.png" alt="" class="card img-fluid"><img src="../png/${face}_${cardNumber}.png" alt="" class="card img-fluid">`;
  quickFade(topCard);
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
  bottomCard.innerHTML = `<img src="../png/back.png" alt="" class="card img-fluid"><img src="../png/back.png" alt="" class="card img-fluid"><img src="../png/${face}_${cardNumber}.png" alt="" class="card img-fluid">`;
  quickFade(bottomCard);
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

// UI: Adds Slower Fade-In Using Opacity on DOM Element
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
  }, 60);
}

// UI: Adds Quicker Fade-In Using Opacity on DOM Element
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
  }, 20);
}

function getCardNumber(card) {}

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

  runTimer();
}

// Game: Starts Round
function playRound() {
  const playerCard = drawPlayerCard();
  const computerCard = drawComputerCard();
  if (distance <= 0) {
    return;
  }
  if (
    playerNewCards.length + playerCards.length <= 0 ||
    computerNewCards.length + computerCards.length <= 0
  ) {
    evalGameResults();
  }
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
  if (playerCardNum > 9) {
    playerCardText = playerCard.substr(3);
  } else {
    playerCardText = playerCard.substr(2);
  }
  if (computerCardNum > 9) {
    computerCardText = computerCard.substr(3);
  } else {
    computerCardText = computerCard.substr(2);
  }
  if (playerCardNum > computerCardNum) {
    const msg = `<span style="color: #28a745">PLAYER WINS ROUND!</span><br><span style="color: rgb(133, 133, 240)">${playerCardText}</span><span style="color: white"> beats </span><span style="color: rgb(240, 133, 133)">${computerCardText}</span>`;
    updateCenterSpan(msg);
    playerNewCards.push(playerCard);
    playerNewCards.push(computerCard);
    updatePlayerCardsNum();
    updateComputerCardsNum();
  } else if (computerCardNum > playerCardNum) {
    const msg = `<span style="color: #dc3545">COMPUTER WINS ROUND!</span><br><span style="color: rgb(240, 133, 133)">${computerCardText}</span><span style="color: white"> beats </span><span style="color: rgb(133, 133, 240)">${playerCardText}</span>`;
    updateCenterSpan(msg);
    computerNewCards.push(playerCard);
    computerNewCards.push(computerCard);
    updatePlayerCardsNum();
    updateComputerCardsNum();
  } else {
    gameBtn.style.display = 'none';
    gameBtn.disabled = true;
    updatePlayerCardsNum();
    updateComputerCardsNum();
    preWarTopCards(computerCard);
    preWarBottomCards(playerCard);
    const msg = `<span style="color: #ffc107">WAR!</span><br><span style="color: rgb(133, 133, 240)">${playerCardText}</span><span style="color: white"> ties with </span><span style="color: rgb(240, 133, 133)">${computerCardText}</span><span style="color: white">...</span><div class="loadingwheel"></div>`;
    updateCenterSpan(msg);
    // Warning Color
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
  let msg;
  if (
    playerNewCards.length + playerCards.length >
    computerNewCards.length + computerCards.length
  ) {
    centerSpan.style.color = 'white';
    if (distance <= 0) {
      msg =
        'TIMES UP..... <span style="color: #28a745">PLAYER WINS THE GAME!</span><br><span style="color: #ffc107">Press Reset to Play Again</span>';
    } else {
      msg =
        '<span style="color: #28a745">PLAYER WINS!</span><br><span style="color: #ffc107">Press Reset to Play Again</span>';
    }
    updateCenterSpan(msg);
    isGameOver = true;
    clearInterval(time);
    timer.innerText = 'GAME OVER';
    gameBtn.style.display = 'none';
    resetBtn.style.display = 'inline-block';
  } else if (
    computerNewCards.length + computerCards.length >
    playerNewCards.length + playerCards.length
  ) {
    if (distance <= 0) {
      msg =
        'TIMES UP..... <span style="color: #dc3545">COMPUTER WINS THE GAME!</span><br><span style="color: #ffc107">Press Reset to Play Again</span>';
    } else {
      msg =
        '<span style="color: #dc3545">COMPUTER WINS</span><br><span style="color: #ffc107">Press Reset to Play Again</span>';
    }
    updateCenterSpan(msg);
    isGameOver = true;
    clearInterval(time);
    timer.innerText = 'GAME OVER';
    gameBtn.style.display = 'none';
    resetBtn.style.display = 'inline-block';
  } else {
    msg =
      'TIMES UP..... SCORE IS TIED!<br><span style="color: #28a745">OVERTIME HAS BEGUN!</span>';
    clearInterval(time);
    updateCenterSpan(msg);
    timer.innerText = '2m 0s';
    distance = 120000;
    runTimer();
    centerSpan.style.color = '#ffc107';
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
  } else {
    playerCardText = playerCard3.substr(2);
  }
  if (computerCardNum > 10) {
    computerCardText = computerCard3.substr(3);
  } else {
    computerCardText = computerCard3.substr(2);
  }
  if (distance <= 0) {
    return;
  }
  warTopCards(computerCard3);
  warBottomCards(playerCard3);
  if (playerCardNum > computerCardNum) {
    if (distance <= 0) {
      return;
    }
    const msg = `<span style="color: #28a745">PLAYER WINS THE WAR!</span><br><span style="color: rgb(133, 133, 240)">${playerCardText}</span><span style="color: white"> beats </span><span style="color: rgb(240, 133, 133)">${computerCardText}</span>`;
    updateCenterSpan(msg);
    addWarCardsToPlayer();
    updatePlayerCardsNum();
    updateComputerCardsNum();
    warCards.length = 0;
    gamebtn.style.display = 'block';
    gameBtn.disabled = false;
  } else if (computerCardNum > playerCardNum) {
    if (distance <= 0) {
      return;
    }
    const msg = `<span style="color: #dc3545">COMPUTER WINS THE WAR!</span><br><span style="color: rgb(240, 133, 133)">${computerCardText}</span><span style="color: white"> beats </span><span style="color: rgb(133, 133, 240)">${playerCardText}</span>`;
    updateCenterSpan(msg);
    addWarCardsToComputer();
    updatePlayerCardsNum();
    updateComputerCardsNum();
    warCards.length = 0;
    gamebtn.style.display = 'block';
    gameBtn.disabled = false;
  } else {
    if (distance <= 0) {
      return;
    }
    updateCenterSpan(
      `<span style="color:#ffc107">ANOTHER WAR!</span><br><span style="color: rgb(133, 133, 240)">Player drew ${playerCardText}</span><span style="color: white"> and </span><span style="color: rgb(240, 133, 133)">Computer drew ${computerCardText}...</span><div class="loadingwheel"></div>`
    );
    preWarTopCards(computerCard3);
    preWarBottomCards(playerCard3);
    gameBtn.style.display = 'none';
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
  time = setInterval(() => {
    distance = distance - 1000;
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);
    if (distance > 0) {
      timeLeft = `${minutes}m ${seconds}s`;
      timer.innerText = timeLeft;
    } else {
      clearInterval(time);
    }
    if (distance <= 0) {
      clearInterval(time);
      evalGameResults();
      return;
    }
    if (isGameOver === true) {
      clearInterval(time);
      timer.innerText = 'GAME OVER';
      return;
    }
  }, 1000);
}

function resetGame() {
  playerCards = undefined;
  playerNewCards.length = 0;
  computerCards = undefined;
  computerNewCards.length = 0;
  resetTime();
  isGameOver = false;
  startGame();
  updatePlayerCardsNum();
  updateComputerCardsNum();
  playRound();
  gameBtn.style.display = 'inline-block';
  resetBtn.style.display = 'none';
}

function resetTime() {
  distance = 240000;
  timer.innerText = '4m 0s';
}

// Game: Initalizes Game on Page Load
startGame();
gameBtn.addEventListener('click', playRound);
resetBtn.addEventListener('click', resetGame);
