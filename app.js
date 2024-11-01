const btns = document.querySelectorAll(".img-item");
const imgPicked = document.querySelector(".img-picked");
const machinePicked = document.querySelector(".machine-picked");
const imgTie = document.querySelector(".both-tie");
const playerScore = document.querySelector(".playerScore");
const machineScore = document.querySelector(".machineScore");
const iconClose = document.querySelector(".icon-close");
const popUpCard = document.querySelector(".card");
const imgWinner = document.querySelector(".winner");
const fail = document.querySelector(".fail");
const playAgain = document.querySelector(".btn-play");
const images = [
    {
        id: 1,
        name: "rock",
        img: "./images/rocks.png",
    },
    {
        id: 2,
        name: "paper",
        img: "./images/paper.png",
    },
    {
        id: 3,
        name: "scissors",
        img: "./images/scissors.png",
    },
];
const audio_equal = new Audio("./audio/equal.wav");
const audio_fail = new Audio("./audio/game-fail.mp3");
const audio_win = new Audio("./audio/game-win.mp3");
let scors1 = 1;
let scors2 = 1;

btns.forEach(function (btn) {
    btn.addEventListener("click", (e) => {
        let playerChoice;
        if (btn.classList.contains("rock")) {
            playerChoice = "rock";
            imgPicked.src = images[0].img;
        } else if (btn.classList.contains("paper")) {
            playerChoice = "paper";
            imgPicked.src = images[1].img;
        } else {
            playerChoice = "scissors";
            imgPicked.src = images[2].img;
        }

        const randomNo = autoPick();
        machinePicked.src = images[randomNo].img;
        totalScore(playerChoice, randomNo);
    });
});

// Logic of rock paper scissors 

function totalScore(playerChoice, randomNo) {
    const machineChoice = images[randomNo].name;
    if (playerChoice === images[randomNo].name) {
        imgTie.classList.add("show");
        audio_equal.play();
    } else if (
        (playerChoice === "rock" && machineChoice === "scissors") ||
        (playerChoice === "scissors" && machineChoice === "paper") ||
        (playerChoice === "paper" && machineChoice === "rock")
    ) {
        playerScore.textContent = scors1++;
        imgTie.classList.remove("show");
    } else if (scors1 === 10) {
        playerScore.textContent = scors1++;
        audio_win.play();
        imgWinner.src = "./images/celebration.jpg";
        popUpCard.classList.add("show1")
    } else if (scors2 === 10) {
        machineScore.textContent = scors2++;
        audio_fail.play();
        fail.textContent = "Fail😲";
        popUpCard.classList.add("show1")
    } else {
        machineScore.textContent = scors2++;
        imgTie.classList.remove("show");
    }
}

// Removing the Pop-up card

iconClose.addEventListener("click", () => {
    popUpCard.classList.remove("show1");
    playerScore.textContent = 0;
    machineScore.textContent = 0;
    imgWinner.src = " ";
    fail.textContent = " ";
    scors1 = 0;
    scors2 = 0;
});

// Play again btn

playAgain.addEventListener("click", () => {
    popUpCard.classList.remove("show1");
    playerScore.textContent = 0;
    machineScore.textContent = 0;
    imgWinner.src = " ";
    fail.textContent = " ";
    scors1 = 0;
    scors2 = 0;
});
// Picking random number

function autoPick() {
    const currentItem = Math.floor(Math.random() * images.length);
    return currentItem;
};
