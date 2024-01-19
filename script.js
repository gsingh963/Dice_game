'use strict';
const score0EL = document.querySelector('#score--0');
// we can also use getElementById
const score1EL = document.querySelector('#score--1');
const diceEl = document.querySelector('.dice');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;
const intialisation = function () {
  score0EL.textContent = 0;
  score1EL.textContent = 0;
  diceEl.classList.add('hidden');

  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player1El.classList.remove('player--active');
  player0El.classList.add('player--active');
};

intialisation();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// rolling the dice functionality
btnRoll.addEventListener('click', function () {
  // 1. generating a random dice roll
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);
    // 2. display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    // 3. check if the score is 1 or not
    // if 1 then switch to 2nd player other wise continue the game and add the score in to current score

    // if the dice is not 1
    if (dice !== 1) {
      // add dice to current score
      currentScore += dice;
      // current0El.textContent = currentScore;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore; // storing the value dynamically
    } else {
      // switching to active player
      switchPlayer();
    } // toggle will include the class if class is not there and if class is already there then it will remove the class.
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // adding the current score to total score of active player
    scores[activePlayer] += currentScore;
    // display the total score
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // check if score is above 100
    if (scores[activePlayer] >= 20) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    }
    // switching to active player
    switchPlayer();
  }
});

btnNew.addEventListener('click', intialisation);
