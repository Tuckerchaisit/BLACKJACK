/*-------------------------------- Constants --------------------------------*/
const flipSound = new Audio("../audio/flipSound.wav")
const playerWonSound = new Audio("../audio/playerWonSound.m4a")
const dealerWonSound = new Audio("../audio/dealerWonSound.m4a")
const tieSound = new Audio("../audio/tieSound.m4a")
const bjSound = new Audio("../audio/bjSound.m4a")
const hitOrStandSound = new Audio("../audio/hitOrStandSound.m4a")


/*---------------------------- Variables (state) ----------------------------*/
let deck1 = ["dA", "dQ", "dK", "dJ", "d10", "d09", "d08", "d07", "d06", "d05", "d04", "d03", "d02", "hA", "hQ", "hK", "hJ", "h10", "h09", "h08", "h07", "h06", "h05", "h04", "h03", "h02", "cA", "cQ", "cK", "cJ", "c10", "c09", "c08", "c07", "c06", "c05", "c04", "c03", "c02", "sA", "sQ", "sK", "sJ", "s10", "s09", "s08", "s07", "s06", "s05", "s04", "s03", "s02"]

let cardPicked;
let playerPoints;
let dealerPoints;
let aceCounter;
let dealerHand = [];
let playerHand = [];
/*------------------------ Cached Element References ------------------------*/
const msgStat = document.querySelector("#msg"); //Store the element that displays the game status on the page
const dealerCards = Array.from(document.querySelectorAll(".dealer"));
const playerCards = Array.from(document.querySelectorAll(".player"));
const hitBtn = document.querySelector(".hit");
const standBtn = document.querySelector(".stand");
const StartNewGame = document.querySelector(".new-game");
const banner = document.querySelector("#title");

/*----------------------------- Event Listeners -----------------------------*/
hitBtn.addEventListener('click', handleHit);
standBtn.addEventListener('click', handleStand);
StartNewGame.addEventListener('click', init);

hitBtn.addEventListener('mouseover',() => {hitBtn.classList.add('animate__animated', 'animate__tada');});
hitBtn.addEventListener('mouseleave',() => {hitBtn.classList.remove('animate__animated', 'animate__tada');});
standBtn.addEventListener('mouseover',() => {standBtn.classList.add('animate__animated', 'animate__tada',);});
standBtn.addEventListener('mouseleave',() => {standBtn.classList.remove('animate__animated', 'animate__tada');});
StartNewGame.addEventListener('mouseover', () => {StartNewGame.classList.add('animate__animated', 'animate__pulse',);});
StartNewGame.addEventListener('mouseleave', () => {StartNewGame.classList.remove('animate__animated', 'animate__pulse',);});
/*-------------------------------- Functions --------------------------------*/
init();

function init() {
  deck1 = ["dA", "dQ", "dK", "dJ", "d10", "d09", "d08", "d07", "d06", "d05", "d04", "d03", "d02", "hA", "hQ", "hK", "hJ", "h10", "h09", "h08", "h07", "h06", "h05", "h04", "h03", "h02", "cA", "cQ", "cK", "cJ", "c10", "c09", "c08", "c07", "c06", "c05", "c04", "c03", "c02", "sA", "sQ", "sK", "sJ", "s10", "s09", "s08", "s07", "s06", "s05", "s04", "s03", "s02"]
  dealerHand = [null, null, null, null, null];
  playerHand = [null, null, null, null, null];
  playerPoints = 0;
  dealerPoints = 0;
  hitBtn.disabled = false;
  standBtn.disabled = false;
  resetHands();
  handleStart();
  render();
}

function handleStart() {

  assignCardDealer();
  dealerCards[1].classList.remove('outline');
  dealerCards[1].classList.add("back-red");
  assignCardPlayer();
  assignCardPlayer();

  //test 3 ACE condition
  // playerHand = ['dA','dA','dA',null,null];
  // playerCards[0].classList.remove('outline');
  // playerCards[0].classList.add('dA');
  // playerCards[1].classList.remove('outline');
  // playerCards[1].classList.add('dA');
  // playerCards[2].classList.remove('outline');
  // playerCards[2].classList.add('dA');
  
}

function render() {
  calcTotal();
  isBJ();
}

function isBJ() {
  if (playerPoints === 21) {
    if (((playerHand[0].slice(1) === 'A' && playerHand[1].slice(1) === 'K') || (playerHand[0].slice(1) === 'A' && playerHand[1].slice(1) === 'Q') || (playerHand[0].slice(1) === 'A' && playerHand[1].slice(1) === 'J'))
      || ((playerHand[0].slice(1) === 'K' && playerHand[1].slice(1) === 'A') || (playerHand[0].slice(1) === 'Q' && playerHand[1].slice(1) === 'A') || (playerHand[0].slice(1) === 'J' && playerHand[1].slice(1) === 'A'))) {
      bjSound.play();
      msgStat.innerHTML = "Player has <br/> !! B L A C K J A C K !!"
      banner.classList.add('animate__animated', 'animate__flash');
      msgStat.classList.add('animate__animated', 'animate__flash');
      stopHitStand();
    } else {
      playerWonSound.play();
      msgStat.innerHTML = "The player has won <br/> Player score: 21"
      stopHitStand();
    }
  } else {
    if (playerPoints > 21) {
      dealerWonSound.play();
      msgStat.innerHTML = `The player has lost <br/> Player's score exceed 21!`
      stopHitStand();
    } else {
      hitOrStandSound.play();
      msgStat.innerHTML = `The player's current score is ${playerPoints} <br/> HIT or STAND`
    }
  }
}

function handleHit() { //assign card to player
  
  playerPoints = 0;
  assignCardPlayer();
  render();
}

function handleStand() { //check winning condition
  
  playerPoints = 0;
  calcPlayerTotal();
  dealerPlay();
  isWinner();
}

function isWinner() {
  if (dealerPoints > 21) {
    playerWonSound.play();
    msgStat.innerHTML = `The player has won <br/> Dealer's score exceed 21!`
    stopHitStand();
  } else {
    if (dealerPoints === 21) {
      if (((dealerHand[0].slice(1) === 'A' && dealerHand[1].slice(1) === 'K') || (dealerHand[0].slice(1) === 'A' && dealerHand[1].slice(1) === 'Q') || (dealerHand[0].slice(1) === 'A' && dealerHand[1].slice(1) === 'J'))
        || ((dealerHand[0].slice(1) === 'K' && dealerHand[1].slice(1) === 'A') || (dealerHand[0].slice(1) === 'Q' && dealerHand[1].slice(1) === 'A') || (dealerHand[0].slice(1) === 'J' && dealerHand[1].slice(1) === 'A'))) {
        bjSound.play();
        msgStat.innerHTML = 'Dealer has <br/> !! B L A C K J A C K !!'
        banner.classList.add('animate__animated', 'animate__flash');
        msgStat.classList.add('animate__animated', 'animate__flash');
        stopHitStand();
      }else{
        dealerWonSound.play();
        msgStat.innerHTML = `The dealer has won <br/> Player score: ${playerPoints}<br/> Dealer score: ${dealerPoints}`
      }
    } else {
      if (playerPoints < 22 && playerPoints > dealerPoints && dealerPoints < 22) {
        playerWonSound.play();
        msgStat.innerHTML = `The player has won <br/> Player score: ${playerPoints}<br/> Dealer score: ${dealerPoints}`
        stopHitStand();
      } else {
        if (playerPoints < dealerPoints && dealerPoints < 22) {
          dealerWonSound.play();
          msgStat.innerHTML = `The player has lost <br/> Player score: ${playerPoints}<br/> Dealer score: ${dealerPoints}`
          stopHitStand();
        } else {
          tieSound.play();
          msgStat.innerHTML = `It's a Tie! <br/> The score is ${playerPoints}`
          stopHitStand();
        }
      }
    }
  }
}

function dealerPlay() {
  dealerCards[1].classList.remove('back-red');
  dealerCards[1].classList.add('animate__animated', 'animate__flipInY');
  assignCardDealer();
  calcDealerTotal();

  while (dealerPoints < 17) {
    assignCardDealer();
    calcDealerTotal();
  }
}

function calcTotal() { //calculate the current points of player and dealer
  calcPlayerTotal();
  calcDealerTotal();
}

function calcDealerTotal() {
  dealerPoints = 0;
  for (let i = 0; i < dealerHand.length; i++) {
    if (dealerHand[i] !== null && dealerHand[i].slice(1) !== 'A') {
      if (dealerHand[i].slice(1) === 'J' || dealerHand[i].slice(1) === 'K' || dealerHand[i].slice(1) === 'Q' || dealerHand[i].slice(1) === '10') {
        dealerPoints += 10;
      } else {
        dealerPoints += (parseInt(dealerHand[i].slice(1)));
      }
    }
  }
  for (let i = 0; i < dealerHand.length; i++) {  //get how many aces are on the hand
    if (dealerHand[i] !== null && dealerHand[i].slice(1) === 'A') {
      aceCounter++;
    }
  }
  for (let i = 0; i < dealerHand.length; i++) {  //condition with value of ace based on how many aces are on the hand
    if (dealerHand[i] !== null && dealerHand[i].slice(1) === 'A') {
      if (dealerHand <= 10 && aceCounter<2) {
        dealerPoints += 11;
      } else {
        dealerPoints += 1;
        if(aceCounter ===2 && dealerPoints<10){
          dealerPoints += 10;
        }else{
          if(aceCounter ===3 && dealerPoints<9){
            dealerPoints += 10;
          }else{
            if(aceCounter===4 && dealerPoints<8){
              dealerPoints += 10;
            }
          }
        }
      }
    }
  }
  
}

function calcPlayerTotal() {
  playerPoints = 0;
  aceCounter=0;
  for (let i = 0; i < playerHand.length; i++) {
    if (playerHand[i] !== null && playerHand[i].slice(1) !== 'A') {
      if (playerHand[i].slice(1) === 'J' || playerHand[i].slice(1) === 'K' || playerHand[i].slice(1) === 'Q' || playerHand[i].slice(1) === '10') {
        playerPoints += 10;
      } else {
        playerPoints += (parseInt(playerHand[i].slice(1)));
      }
    }
  }
  for (let i = 0; i < playerHand.length; i++) {  //get how many aces are on the hand
    if (playerHand[i] !== null && playerHand[i].slice(1) === 'A') {
      aceCounter++;
    }
  }
  for (let i = 0; i < playerHand.length; i++) {  //condition with value of ace based on how many aces are on the hand
    if (playerHand[i] !== null && playerHand[i].slice(1) === 'A') {
      if (playerPoints <= 10 && aceCounter<2) {
        playerPoints += 11;
      } else {
        playerPoints += 1;
        if(aceCounter ===2 && playerPoints<10){
          playerPoints += 10;
        }else{
          if(aceCounter ===3 && playerPoints<9){
            playerPoints += 10;
          }else{
            if(aceCounter===4 && playerPoints<8){
              playerPoints += 10;
            }
          }
        }
      }
    }
  }
}

function pickCard() {
  let randIdx = Math.floor(Math.random() * deck1.length);
  cardPicked = deck1.splice(randIdx, 1)[0];
}

function assignCardDealer() {
  pickCard();
  for (let i = 0; i < dealerHand.length; i++) {
    if (dealerHand[i] === null) {
      dealerHand[i] = cardPicked;
      dealerCards[i].classList.remove('outline');
      dealerCards[i].classList.add(cardPicked);
      flipSound.play();
      dealerCards[i].classList.add('animate__animated', 'animate__flipInY');
      return;
    }
  }
}

function assignCardPlayer() {
  pickCard();
  for (let i = 0; i < playerHand.length; i++) {
    if (playerHand[i] === null) {
      playerHand[i] = cardPicked;
      playerCards[i].classList.remove('outline');
      playerCards[i].classList.add(cardPicked);
      flipSound.play();
      playerCards[i].classList.add('animate__animated', 'animate__flipInY');
      return;
    }
    }
}

function resetHands() {
  dealerCards.forEach(element => element.removeAttribute('class'));
  playerCards.forEach(element => element.removeAttribute('class'));
  void hitBtn.offsetHeight
  dealerCards.forEach(element => element.setAttribute('class', 'card small outline dealer'));
  playerCards.forEach(element => element.setAttribute('class', 'card small outline player'));
}

function stopHitStand() {
  hitBtn.disabled = true;
  standBtn.disabled = true;
}
