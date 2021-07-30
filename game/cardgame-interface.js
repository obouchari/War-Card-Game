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

function changeTopCard(computerCard) {
  let cardnumber = parseInt(computerCard);
  if (cardnumber > 10) {
    switch (cardnumber) {
      case 11:
        cardnumber = 'jack';
        break;
      case 12:
        cardnumber = 'queen';
        break;
      case 13:
        cardnumber = 'king';
        break;
      case 14:
        cardnumber = '1';
        break;
    }
  }
  const face = computerCard.split('of ')[1].toLowerCase().slice(0, -1);
  console.log(cardnumber);
  console.log(face);

  topCard.innerHTML = `<img src="./png/${face}_${cardnumber}.png" alt="" class="card img-fluid">`;
}

function changeBottomCard(playerCard) {
  let cardnumber = parseInt(playerCard);
  if (cardnumber > 10) {
    switch (cardnumber) {
      case 11:
        cardnumber = 'jack';
        break;
      case 12:
        cardnumber = 'queen';
        break;
      case 13:
        cardnumber = 'king';
        break;
      case 14:
        cardnumber = '1';
        break;
    }
  }
  const face = playerCard.split('of ')[1].toLowerCase().slice(0, -1);
  console.log(cardnumber);
  console.log(face);

  bottomCard.innerHTML = `<img src="./png/${face}_${cardnumber}.png" alt="" class="card img-fluid">`;
}

function changeCenterText(msg) {
  centerText.innerHTML = msg;
}

function updateComputerText(computerText) {
  topText.innerText = computerText;
}

function updatePlayerText(playerText) {
  bottomText.innerText = playerText;
}

setInterval(() => {
  timer.innerText = timeLeft;
}, 1000);

function warTopCards(computerCard3) {
  let cardnumber = parseInt(computerCard3);
  if (cardnumber > 10) {
    switch (cardnumber) {
      case 11:
        cardnumber = 'jack';
        break;
      case 12:
        cardnumber = 'queen';
        break;
      case 13:
        cardnumber = 'king';
        break;
      case 14:
        cardnumber = '1';
        break;
    }
  }
  const face = computerCard3.split('of ')[1].toLowerCase().slice(0, -1);
  console.log(cardnumber);
  console.log(face);

  topCard.innerHTML = `<img src="./png/${face}_${cardnumber}.png" alt="" class="card img-fluid">`;
}

function warBottomCards(playerCard3) {
  let cardnumber = parseInt(playerCard3);
  if (cardnumber > 10) {
    switch (cardnumber) {
      case 11:
        cardnumber = 'jack';
        break;
      case 12:
        cardnumber = 'queen';
        break;
      case 13:
        cardnumber = 'king';
        break;
      case 14:
        cardnumber = '1';
        break;
    }
  }
  const face = playerCard3.split('of ')[1].toLowerCase().slice(0, -1);
  console.log(cardnumber);
  console.log(face);
  bottomCard.innerHTML = `<img src="./png/${face}_${cardnumber}.png" alt="" class="card img-fluid">`;
}
