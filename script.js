"use strict"
const score0El = document.getElementById("score--0");
const score1El = document.getElementById("score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const diceImg = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

let playing ;
let currentScore ;
let active ;
let scores;

const switchPlayer = function() {
    currentScore = 0;
    document.getElementById(`current--${active}`).textContent = 0
    active = active === 0 ? 1 : 0;
    player0El.classList.toggle("player--active")
    player1El.classList.toggle("player--active")
}

const resetGame = function() {
    playing = true;
    active = 0;
    scores = [0,0];

    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    diceImg.classList.add("hidden");
    player0El.classList.add("player--active");
    player1El.classList.remove("player--active");
    player0El.classList.remove("player--winner");
    player1El.classList.remove("player--winner");
}
resetGame()


btnRoll.addEventListener("click",()=>{
    if(playing) {
        const randomDice = Math.trunc(Math.random() * 6) + 1;
        diceImg.src = `dice-${randomDice}.png`;
        diceImg.classList.remove("hidden");

        if (randomDice !== 1) {
            currentScore += randomDice;
            document.getElementById(`current--${active}`).textContent = currentScore;
        }
        else {
            switchPlayer()
        }
    }
})

btnHold.addEventListener("click",()=>{
    if(playing) {
        scores[active] += currentScore;
        document.getElementById(`score--${active}`).textContent = scores[active];
        if (scores[active] >= 20) {
            playing = false;
            document.querySelector(`.player--${active}`).classList.add("player--winner");
            document.querySelector(`.player--${active}`).classList.remove("player--active");
            diceImg.classList.add("hidden")
        }
        else {
            switchPlayer()
        }
    }
})

btnNew.addEventListener("click",resetGame)