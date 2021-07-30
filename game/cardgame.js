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
    console.log(`Player wins round - ${playerCard} beats ${computerCard}`);
    playerNewCards.push(playerCard);
    playerNewCards.push(computerCard);
  } else if (computerCardNum > playerCardNum) {
    console.log(`Computer wins round - ${computerCard} beats ${playerCard}`);
    computerNewCards.push(playerCard);
    computerNewCards.push(computerCard);
  } else {
    console.log('WAR!!!');
    war();
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

function evalWar(playerCard3, computerCard3) {
  const playerCardNum = parseInt(playerCard3);
  const computerCardNum = parseInt(computerCard3);
  if (playerCardNum > computerCardNum) {
    console.log(
      `Player Wins This War -- ${playerCard3} beats ${computerCard3}`
    );
    addWarCardsToPlayer();
    warCards.length = 0;
  } else if (computerCardNum > playerCardNum) {
    console.log(
      `Player Wins This War -- ${computerCard3} beats ${playerCard3}`
    );
    addWarCardsToComputer();
    warCards.length = 0;
  } else {
    console.log('ANOTHER WAR!');
    war();
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
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    timeLeft = days + 'd ' + hours + 'h ' + minutes + 'm ' + seconds + 's ';
  }, 1000);
}

function resetTime() {
  distance = 60000;
}

if (distance == 0) {
  evalGameResults();
}
