// Pseudo-code:

// // [TODO:]Add the HTML components for message area, hit button, stand button, play again button 
// // [TODO:]Add a container element for the player’s card and dealer’s card to appended to
// // [TODO:]Add cached element for each of the button and message area
// // [TODO:]Add event listeners to each of the buttons

// [TODO:]Upon loading, the app should: 
// [TODO:] call an initialize function to initialize the state variables, initialize deck of cards
// [TODO:] Render those values to the page
// [TODO:]Deal two random cards each to player and dealer
// [TODO:]Define required constant and winning condition
// [TODO:]Handle player clicking hit button or stand button to start the game
// [TODO:]Handle a player clicking the Play again button.
// [TODO:]Add responsive design
// [TODO:]Add google Fonts
// [TODO:]Add a favicon to our site



/*-------------------------------- Constants --------------------------------*/



/*---------------------------- Variables (state) ----------------------------*/
let deck1 = ["dA","dQ","dK","dJ","d10","d09","d08","d07","d06","d05","d04","d03","d02","hA","hQ","hK","hJ","h10","h09","h08","h07","h06","h05","h04","h03","h02","cA","cQ","cK","cJ","c10","c09","c08","c07","c06","c05","c04","c03","c02","sA","sQ","sK","sJ","s10","s09","s08","s07","s06","s05","s04","s03","s02"]

let winner;
let cardPicked;
let cardToRemove;

/*------------------------ Cached Element References ------------------------*/
const msgStat = document.querySelector("#msg"); //Store the element that displays the game status on the page
const dealerCards = Array.from(document.querySelectorAll(".dealer"));
const playerCards = Array.from(document.querySelectorAll(".player"));
const hitBtn = document.querySelector(".hit");
const standBtn = document.querySelector(".stand");
const StartNewGame = document.querySelector(".new-game");

/*----------------------------- Event Listeners -----------------------------*/
hitBtn.addEventListener('click',handleHit);
standBtn.addEventListener('click',handleStand);
StartNewGame.addEventListener('click',init);


/*-------------------------------- Functions --------------------------------*/
init();

function init(){

  deck1 = ["dA","dQ","dK","dJ","d10","d09","d08","d07","d06","d05","d04","d03","d02","hA","hQ","hK","hJ","h10","h09","h08","h07","h06","h05","h04","h03","h02","cA","cQ","cK","cJ","c10","c09","c08","c07","c06","c05","c04","c03","c02","sA","sQ","sK","sJ","s10","s09","s08","s07","s06","s05","s04","s03","s02"]
  dealHand = [null, null, null, null, null];
  playHand = [null, null, null, null, null];
  msgStat.innerHTML = "Press Start-New-Game to start the game!";
  dealerCards.forEach(element => element.removeAttribute('class'));
  playerCards.forEach(element =>element.removeAttribute('class'));
  dealerCards.forEach(element => element.setAttribute('class', 'card small outline player'));
  playerCards.forEach(element =>element.setAttribute('class', 'card small outline player'));
  handleStart();
  render();
}

function handleStart(){
  
  assignCardDealer();
  dealerCards[1].classList.remove('outline');
  dealerCards[1].classList.add("back-red");
  assignCardPlayer();
  assignCardPlayer();
}

function render(){

}

function handleHit(){
  assignCardPlayer();
}

function handleStand(){

}

function pickCard(){
  let randIdx = Math.floor(Math.random()*deck1.length);
  cardPicked = deck1.splice(randIdx, 1)[0];
  
}

function assignCardDealer(){
  pickCard();
  for(let i=0; i<dealHand.length; i++){
    if(dealHand[i]===null){
      dealHand[i]=cardPicked;
      dealerCards[i].classList.remove('outline');
      dealerCards[i].classList.add(cardPicked);
      return;
    }
  }
}

function assignCardPlayer(){
  pickCard();
  for(let i=0; i<playHand.length; i++){
    if(playHand[i]===null){
      playHand[i]=cardPicked;
      playerCards[i].classList.remove('outline');
      playerCards[i].classList.add(cardPicked);
      return;
    }
  }
}
