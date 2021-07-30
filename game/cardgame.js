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
let distance = 600000;
let timeLeft;

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
  if (playerCardNum > computerCardNum) {
    msg = `Player wins round - ${playerCard} beats ${computerCard}`;
    changeCenterText(msg);
    playerCardsText();
    computerCardsText();
    playerNewCards.push(playerCard);
    playerNewCards.push(computerCard);
  } else if (computerCardNum > playerCardNum) {
    msg = `Computer wins round - ${computerCard} beats ${playerCard}`;
    changeCenterText(msg);
    playerCardsText();
    computerCardsText();
    computerNewCards.push(playerCard);
    computerNewCards.push(computerCard);
  } else {
    msg = `WAR - ${playerCard} vs ${computerCard} (please wait for result...)<div class="loadingwheel"></div>`;
    gameBtn.style.display = 'none';
    gameBtn.disabled = true;
    changeCenterText(msg);
    setTimeout(war, 2000);
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
    alert('Player Has More Cards - Player Wins!');
  } else if (
    computerNewCards.length + computerCards.length >
    playerNewCards.length + playerCards.length
  ) {
    alert('Computer Has More Cards - Computer Wins!');
  } else {
    alert('OVERTIME!');
    playerNewCards.forEach((card) => {
      playerCards.unshift(card);
    });
    playerNewCards.length = 0;
    computerNewCards.forEach((card) => {
      computerCards.unshift(card);
    });
    computerNewCards.length = 0;
    distance = 300000;
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

function playerWins() {
  console.log('Player Wins Game!');
}

function computerWins() {
  console.log('Computer Wins Game!');
}

function war() {
  const computerCard1 = drawComputerCard();
  if (computerCard1) {
    warCards.unshift(computerCard1);
  } else {
    playerWins();
    return;
  }
  const computerCard2 = drawComputerCard();
  if (computerCard2) {
    warCards.unshift(computerCard2);
  } else {
    playerWins();
    return;
  }
  const computerCard3 = drawComputerCard();
  if (computerCard3) {
    warCards.unshift(computerCard3);
  } else {
    playerWins();
    return;
  }
  const playerCard1 = drawPlayerCard();
  if (playerCard1) {
    warCards.unshift(playerCard1);
  } else {
    computerWins();
    return;
  }
  const playerCard2 = drawPlayerCard();
  if (playerCard2) {
    warCards.unshift(playerCard2);
  } else {
    computerWins();
    return;
  }
  const playerCard3 = drawPlayerCard();
  if (playerCard3) {
    warCards.unshift(playerCard3);
  } else {
    computerWins();
    return;
  }
  evalWar(playerCard3, computerCard3);
}

function playerCardsText() {
  const numcards = playerCards.length + playerNewCards.length;
  const playerText = `Player has ${numcards} cards`;
  updatePlayerText(playerText);
}

function computerCardsText() {
  const numcards = computerCards.length + computerNewCards.length;
  const computerText = `Computer has ${numcards} cards`;
  updateComputerText(computerText);
}

function evalWar(playerCard3, computerCard3) {
  const playerCardNum = parseInt(playerCard3);
  const computerCardNum = parseInt(computerCard3);
  warTopCards(computerCard3);
  warBottomCards(playerCard3);
  if (playerCardNum > computerCardNum) {
    msg = `PLAYER WINS THE WAR!!! ${playerCard3} beats ${computerCard3}`;
    changeCenterText(msg);
    playerCardsText();
    computerCardsText();
    addWarCardsToPlayer();
    warCards.length = 0;
    gamebtn.style.display = 'block';
    gameBtn.disabled = false;
  } else if (computerCardNum > playerCardNum) {
    msg = `COMPUTER WINS THE WAR!!! ${computerCard3} beats ${playerCard3}`;
    changeCenterText(msg);
    playerCardsText();
    computerCardsText();
    addWarCardsToComputer();
    warCards.length = 0;
    gamebtn.style.display = 'block';
    gameBtn.disabled = false;
  } else {
    updateCenterText(
      `ANOTHER WAR! Player drew ${playerCard} and Computer drew ${computerCard}...<div class="loadingwheel"></div>`
    );
    gameBtn.style.display = 'none';
    gameBtn.disabled = true;
    setTimeout(war, 2000);
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

function runTimer() {
  setInterval(() => {
    distance = distance - 1000;
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    timeLeft = `${minutes}:${seconds}`;
  }, 1000);
}

function resetTime() {
  distance = 60000;
}

if (distance == 0) {
  evalGameResults();
}
