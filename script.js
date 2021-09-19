'use strict';
// selecting query of every element
const name1 = document.querySelector('#name--0'); //player1
const name2 = document.querySelector('#name--1'); //player2
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const score0 = document.querySelector('#score--0');
const score1 = document.getElementById('score--1');
const currScore0 = document.querySelector('#current--0');
const currScore1 = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const btnRoll = document.querySelector('.btn--roll');
//user guide window
const btnUserGuide = document.querySelector('.user'); //to select button of user guide
const windisplay = document.querySelector('.UserGuide'); //to select pop-up window
const closebtn = document.querySelector('.close');
// const pl1 = document.getElementById('p1');
const pl2 = document.getElementById('p2');
const submitBtn = document.querySelector('.submit');
const win = document.querySelector('.window');
win.classList.remove('hid'); // as you open the game window of names will be visible
//creating a state variable which will hold the state of game that game is still being played or its over
let state,
  score = [0, 0], //declaring the variables
  activPlayer,
  currentScore,
  inputValp1,
  inputValp2;
const init = function () {
  state = true; //setting state as true in starting
  name1.innerHTML = 'PLAYER 1';
  name2.innerHTML = 'player 2';
  win.classList.remove('hid'); //when you load again window will appear
  //setting initial conditions
  score = [0, 0]; //array to store the score of active player when he press hold
  score0.textContent = 0;
  score1.textContent = 0;
  activPlayer = 0; //initially active player is player 1
  //adding hidden class to dice to hide it
  diceEl.classList.add('hidden'); //hiding the dice until roll dice is pressed
  currentScore = 0;
  score[0] = 0;
  score[1] = 0;
  currScore0.textContent = 0;
  currScore1.textContent = 0;
  player0.classList.add('player--active');
  diceEl.classList.add('hidden');
  //player winner class will be removed if you are reloading the game again
  document.querySelector('.player--0').classList.remove('player--winner');
  document.querySelector('.player--1').classList.remove('player--winner');
  document.getElementById('p1').value = ' '; //setting value of input boxes to blank
  document.getElementById('p2').value = ' ';
};
//calling init function to initializing the state of game
init();
// after submitting the player names
submitBtn.addEventListener('click', function () {
  inputValp1 = document.getElementById('p1').value;
  name1.innerHTML = inputValp1; //displaying the value in place of player 1 which user enters
  inputValp2 = document.getElementById('p2').value;
  name2.textContent = inputValp2;
  win.classList.add('hid'); // as soon as you click submit input window will disapper
});

// function to switch the player
//it will called in two conditions-1)hold is pressed 2)player encounter 1 on dice
const switchPlayer = function () {
  //before switching to next player set the currents score of active player to 0
  document.getElementById(`current--${activPlayer}`).textContent = 0;
  activPlayer = activPlayer === 0 ? 1 : 0; //if active player is 0 switch it to 1 else switch to 0
  currentScore = 0;
  //now after switching the active player we also have to change its background
  ///through toggle it will add the class if is not there and remove it if it is there
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};
//rolling dice functionality
btnRoll.addEventListener('click', function () {
  //if sate of game is true
  if (state) {
    //1.Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    //console.log(dice);
    //2.Display dice after rolling and random selection
    diceEl.classList.remove('hidden');
    //selecting the dice image with particular random number
    diceEl.src = `dice-${dice}.png`;
    //3.check for roll 1: if true switch to the next player
    if (dice !== 1) {
      //if it is not one then add the value of dice to current score
      currentScore += dice;
      //current score of active player will be manipulated
      document.getElementById(`current--${activPlayer}`).textContent =
        currentScore;
      // console.log(currentScore);
    } else {
      //value of dice is 1 so we have to switch the player

      switchPlayer();
    }
  }
});
btnHold.addEventListener('click', function () {
  if (state) {
    // add current score to the active's player score
    score[activPlayer] += currentScore;
    //displaying score to the screen
    document.getElementById(`score--${activPlayer}`).textContent =
      score[activPlayer];

    // check if score is>=100 // then finish game
    if (score[activPlayer] >= 100) {
      // if player won so changing its css
      document
        .querySelector(`.player--${activPlayer}`)
        .classList.add('player--winner'); //adding player winnwer class
      ///below i used ternery operator to print the name of player who won on sreeen
      activPlayer === 0
        ? (document.getElementById(
            `name--${activPlayer}`
          ).textContent = `${inputValp1} Won!!💥`)
        : (document.getElementById(
            `name--${activPlayer}`
          ).textContent = `${inputValp2} Won!!💥`);

      // we also have to remove active palyer class
      document
        .querySelector(`.player--${activPlayer}`)
        .classList.remove('player--active');
      state = false;
    } else {
      // else switch to next player
      switchPlayer();
    }
  }
});
//new game implementation
btnNew.addEventListener('click', init);
//how to play window
btnUserGuide.addEventListener('click', function () {
  windisplay.classList.remove('visiblity');
});
closebtn.addEventListener('click', function () {
  windisplay.classList.add('visiblity');
});
