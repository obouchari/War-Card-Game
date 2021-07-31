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
}

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
}

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

  topCard.innerHTML = `<img src="../png/${face}_${cardNumber}.png" alt="" class="card img-fluid"><img src="../png/back.png" alt="" class="card img-fluid"><img src="../png/back.png" alt="" class="card img-fluid"><img src="../png/back.png" alt="" class="card img-fluid">`;
}

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
  bottomCard.innerHTML = `<img src="../png/${face}_${cardNumber}.png" alt="" class="card img-fluid"><img src="../png/back.png" alt="" class="card img-fluid"><img src="../png/back.png" alt="" class="card img-fluid"><img src="../png/back.png" alt="" class="card img-fluid">`;
}

function changeCenterText(msg) {
  centerText.innerHTML = msg;
}

function warTopCards(computerCard3, oldComputerCard) {
  let oldCardNumber = parseInt(oldComputerCard);
  if (oldCardNumber > 10) {
    switch (oldCardNumber) {
      case 11:
        oldCardNumber = 'jack';
        break;
      case 12:
        oldCardNumber = 'queen';
        break;
      case 13:
        oldCardNumber = 'king';
        break;
      case 14:
        oldCardNumber = '1';
        break;
    }
  }
  const oldFace = oldComputerCard.split('of ')[1].toLowerCase().slice(0, -1);
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

  topCard.innerHTML = `<img src="../png/${oldFace}_${oldCardNumber}.png" alt="" class="card img-fluid"><img src="../png/back.png" alt="" class="card img-fluid"><img src="../png/back.png" alt="" class="card img-fluid"><img src="../png/${face}_${cardNumber}.png" alt="" class="card img-fluid">`;
}

function warBottomCards(playerCard3, oldPlayerCard) {
  let oldCardNumber = parseInt(oldPlayerCard);
  if (oldCardNumber > 10) {
    switch (oldCardNumber) {
      case 11:
        oldCardNumber = 'jack';
        break;
      case 12:
        oldCardNumber = 'queen';
        break;
      case 13:
        oldCardNumber = 'king';
        break;
      case 14:
        oldCardNumber = '1';
        break;
    }
  }
  const oldFace = oldPlayerCard.split('of ')[1].toLowerCase().slice(0, -1);

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
  bottomCard.innerHTML = `<img src="../png/${oldFace}_${oldCardNumber}.png" alt="" class="card img-fluid"><img src="../png/back.png" alt="" class="card img-fluid"><img src="../png/back.png" alt="" class="card img-fluid"><img src="../png/${face}_${cardNumber}.png" alt="" class="card img-fluid">`;
}

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
  runTimer();
}

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
    const msg = `Player wins - ${playerCardText} beats ${computerCardText}`;
    changeCenterText(msg);
    playerNewCards.push(playerCard);
    playerNewCards.push(computerCard);
    updatePlayerCardsNum();
    updateComputerCardsNum();
  } else if (computerCardNum > playerCardNum) {
    const msg = `Computer wins - ${computerCardText} beats ${playerCardText}`;
    changeCenterText(msg);
    computerNewCards.push(playerCard);
    computerNewCards.push(computerCard);
    updatePlayerCardsNum();
    updateComputerCardsNum();
  } else {
    const msg = `WAR! - ${playerCardText} ties with ${computerCardText}...<div class="loadingwheel"></div>`;
    gameBtn.style.display = 'none';
    gameBtn.disabled = true;
    updatePlayerCardsNum();
    updateComputerCardsNum();
    preWarTopCards(computerCard);
    preWarBottomCards(playerCard);
    changeCenterText(msg);
    setTimeout(() => {
      war(computerCard, playerCard);
    }, 3000);
  }
}

function drawPlayerCard() {
  if (playerCards.length > 0) {
    return playerCards.shift();
  } else {
    console.log('Shifting New Cards to Player Deck');
    addNewCardsToPlayer();
    return playerCards.shift();
  }
}

function drawComputerCard() {
  if (computerCards.length > 0) {
    return computerCards.shift();
  } else {
    console.log('Shifting New Cards to Computer Deck');
    addNewCardsToComputer();
    return playerCards.shift();
  }
}

function addNewCardsToPlayer() {
  if (playerNewCards.length > 0) {
    playerNewCards.forEach((card) => {
      playerCards.push(card);
    });
    playerNewCards.length = 0;
  } else {
    evalGameResults();
  }
}

function addNewCardsToComputer() {
  if (computerNewCards.length > 0) {
    computerNewCards.forEach((card) => {
      computerCards.push(card);
    });
    computerNewCards.length = 0;
  } else evalGameResults();
}

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
    const msg = 'OVERTIME - 2 MINUTES REMAINING';
    alert(msg);
    distance = 120000;
    runTimer();
  }
}

function showCards() {
  console.log(playerCards, playerNewCards);
  console.log(computerCards, computerNewCards);
}

const newDeck = new Deck();
newDeck.shuffle();
console.log(newDeck.deck);
startGame();

function war(oldComputerCard, oldPlayerCard) {
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
  evalWar(computerCard3, oldComputerCard, playerCard3, oldPlayerCard);
}

function updatePlayerCardsNum() {
  const numcards = playerCards.length + playerNewCards.length;
  const playerText = `Player has ${numcards} cards`;
  updatePlayerCardsDisplay(playerText);
}

function updateComputerCardsNum() {
  const numcards = computerCards.length + computerNewCards.length;
  const computerText = `Computer has ${numcards} cards`;
  updateComputerCardsDisplay(computerText);
}

function updateComputerCardsDisplay(computerText) {
  topText.innerText = computerText;
}

function updatePlayerCardsDisplay(playerText) {
  bottomText.innerText = playerText;
}

function evalWar(computerCard3, oldComputerCard, playerCard3, oldPlayerCard) {
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
  warTopCards(computerCard3, oldComputerCard);
  warBottomCards(playerCard3, oldPlayerCard);
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
      war(computerCard3, playerCard3);
    }, 2500);
  }
}

function addWarCardsToPlayer() {
  warCards.forEach((card) => {
    playerNewCards.push(card);
  });
}

function addWarCardsToComputer() {
  warCards.forEach((card) => {
    computerNewCards.push(card);
  });
}

gameBtn.addEventListener('click', playRound);

function runTimer() {
  setInterval(() => {
    distance = distance - 1000;
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);
    if (distance > 0) {
      timeLeft = `${minutes}m ${seconds}s`;
    } else {
      timeLeft = 'GAME OVER';
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

function resetTime() {
  distance = 240000;
}

if (distance == 0) {
  evalGameResults();
}

// function endGame(msg) {
//   // Pop up alert message
//   alert(msg);
// }
