window.onload = function() {
    init();
};

var numCards = 6;
var gameOver = false;
var colors = [];
var pickedColor;
var curMode = "hard";
var body = document.querySelector("body");
var cards = document.querySelectorAll(".card");
var colorDisplay = document.getElementById("color-picked");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var resetDisplay = document.querySelector("#reset span");
var easyMode = document.getElementById("easy-mode");
var hardMode = document.getElementById("hard-mode");
var nightmareMode = document.getElementById("nightmare-mode");
var timerDisplay = document.getElementById("timer");
var countdownFunc;
var countdownTime;

easyMode.addEventListener("click", function() {
    easyMode.classList.add("selected");
    hardMode.classList.remove("selected");
    nightmareMode.classList.remove("selected");
    body.classList.remove("blink");
    clearInterval(countdownFunc);
    timerDisplay.textContent = "";
    resetButton.style.visibility = "visible";
    numCards = 3;
    curMode = "easy";
    initCards();
    reset();
});

hardMode.addEventListener ("click", function() {
    easyMode.classList.remove("selected");
    hardMode.classList.add("selected");
    nightmareMode.classList.remove("selected");
    body.classList.remove("blink");
    clearInterval(countdownFunc);
    timerDisplay.textContent = "";
    resetButton.style.visibility = "visible";
    numCards = 6;
    curMode = "hard";
    initCards();
    reset();
});

nightmareMode.addEventListener ("click", function() {
    easyMode.classList.remove("selected");
    hardMode.classList.remove("selected");
    nightmareMode.classList.add("selected");
    body.classList.add("blink");
    clearInterval(countdownFunc);
    timerDisplay.textContent = "";
    resetButton.style.visibility = "hidden";
    numCards = 6;
    curMode = "nightmare";
    countdownTime = 5;
    timerDisplay.textContent = countdownTime;
    countdownFunc = setInterval(function(){
        countdownTime -= 1;
        timerDisplay.textContent = countdownTime;
        if(countdownTime === 0) {
            clearInterval(countdownFunc);
            body.classList.remove("blink");
            messageDisplay.textContent = "";
            timerDisplay.textContent = "TIMEOUT!";
            resetDisplay.textContent = "Play Again"
            resetButton.style.visibility = "visible";
            changeColors("#FFF");
            body.style.backgroundColor = pickedColor;
            gameOver = true;
        }
    }, 1000);
    initCards();
    reset();
});

function init() {
    initCards();
    reset();
}

function initCards() {
    if(curMode !== "nightmare") {
        timerDisplay.textContent = "";
        clearInterval(countdownFunc);
    }

    for (var i = 0; i < cards.length; i++) {
        //add click listeners to cards
        cards[i].addEventListener("click", function() {
            if (gameOver)
                return;
            //grab color of clicked card
            var clickedColor = this.style.backgroundColor;
            // alert(this.style.backgroundColor);
            //compare color to pickedColor
            if (clickedColor === pickedColor) {
                body.classList.remove("blink");
                clearInterval(countdownFunc);
                timerDisplay.textContent = "";
                messageDisplay.textContent = "Correct!";
                resetDisplay.textContent = "Play Again"
                changeColors("#FFF");
                body.style.backgroundColor = clickedColor;
                resetButton.style.visibility = "visible";
                gameOver = true;
            }
            
            else {
                this.style.opacity = 0;
                messageDisplay.textContent = "Try Again"
            }
        });
    }
}

function reset() {
    if(curMode !== "nightmare") {
        body.classList.remove("blink");
        timerDisplay.textContent = "";
        clearInterval(countdownFunc);
    }

    gameOver = false;
    colors = generateRandomColors(numCards);
    //pick a new random color from array
    pickedColor = pickColor();
    //change colorDisplay to match picked Color
    colorDisplay.textContent = pickedColor;
    resetDisplay.textContent = "New Color"
    messageDisplay.textContent = "What's the Color?";
    //change colors of cards
    for (var i = 0; i < cards.length; i++) {
        cards[i].style.opacity = 1;
        if (colors[i]) {
            cards[i].style.display = "block"
            cards[i].style.backgroundColor = colors[i];
        }
        
        else {
            cards[i].style.display = "none";
        }
    }
    body.style.backgroundColor = "#232323";
}

resetButton.addEventListener("click", function() {
    if(curMode !== "nightmare") {
        reset();
    }
    
    else {
        body.classList.add("blink");
        countdownTime = 5;
        timerDisplay.textContent = countdownTime;
        resetButton.style.visibility = "hidden";
        countdownFunc = setInterval(function(){
            countdownTime -= 1;
            timerDisplay.textContent = countdownTime;
            if(countdownTime === 0) {
                clearInterval(countdownFunc);
                body.classList.remove("blink");
                timerDisplay.textContent = "";
                messageDisplay.textContent = "";
                timerDisplay.textContent = "TIMEOUT!";
                resetDisplay.textContent = "Play Again"
                resetButton.style.visibility = "visible";
                changeColors("#FFF");
                body.style.backgroundColor = pickedColor;
                gameOver = true;
            }
        }, 1000);
        reset();
    }
})

function changeColors(color) {
    //loop through all cards
    for (var i = 0; i < cards.length; i++) {
        //change each color to match given color
        cards[i].style.opacity = 1;
        cards[i].style.backgroundColor = color;
    }
}

function pickColor() {
    var random = Math.floor(Math.random() * colors.length);
    return colors[random];
}

function generateRandomColors(num) {
    //make an array
    var arr = []
    //repeat num times
    for (var i = 0; i < num; i++) {
        //get random color and push into arr
        arr.push(randomColor())
    }
    //return that array
    return arr;
}

function randomColor() {
    //pick a "red" from 0 - 255
    var r = Math.floor(Math.random() * 256);
    //pick a "green" from  0 -255
    var g = Math.floor(Math.random() * 256);
    //pick a "blue" from  0 -255
    var b = Math.floor(Math.random() * 256);
    return "rgb(" + r + ", " + g + ", " + b + ")";
}
