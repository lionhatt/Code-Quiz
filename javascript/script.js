var timer = document.querySelector("#timer");
var highScoresLink = document.querySelector("#highScores");
var question = document.querySelector("#question");
var answers = document.getElementsByClassName("answers")
var answer1 = document.querySelector("#answer1");
var answer2 = document.querySelector("#answer2");
var answer3 = document.querySelector("#answer3");
var answer4 = document.querySelector("#answer4");
var startButton = document.createElement("button");
startButton.innerHTML = "Start";
var userInput = document.createElement("input");
userInput.setAttribute("type", "text");
var submitButton = document.createElement("button");
submitButton.innerHTML = "Submit"
var gobackButton = document.createElement("button");
gobackButton.innerHTML = "GO Back";
var clearButton = document.createElement("button");
clearButton.innerHTML = "Clear Highscores";

window.onload = initPage;



var jsQuestions = [{
    question: "Inside which HTML element do we put the JavaScript?",
    answer1: "<script>",
    answer2: "<javascript>",
    answer3: "<js>",
    answer4: "<scripting>",
    correctAnswer: "<scripting>"
}, {
    question: "Where is the correct place to insert a JavaScript?",
    answer1: "Both the <head> section and the <body> section are correct",
    answer2: "The <head> section",
    answer3: "The <body> section",
    answer4: "the <html> section",
    correctAnswer: "The <body> section"
}]

function quiz(){
    clearContent();
    
    var i = 0;
    while (i < jsQuestions.length){
        jsQuestions[i].question = question.textContent;


        })

    }
    
}

startButton.addEventListener("click", function () {
    startTimer();
})

//start the count-down timer
function startTimer() {
    timeLeft = 2;

    var timeInterval = setInterval(function () {
        timer.textContent = "time: " + timeLeft;
        timeLeft--;

        if (timeLeft === 0) {
            clearInterval(timeInterval);
            clearContent();
            scoreBoard();
        }


    }, 1000);
}

//clear the content of the page
function clearContent() {
    question.innerHTML = "";
    answer1.innerHTML = "";
    answer2.innerHTML = "";
    answer3.innerHTML = "";
    answer4.innerHTML = "";

}

function scoreBoard() {
    question.textContent = "All done!";
    answer1.textContent = "Your final score is " + timeLeft;
    answer2.textContent = "Your initials "
    answer2.appendChild(userInput);
    answer2.appendChild(submitButton);



}

submitButton.addEventListener("click", highScoresPage);

highScoresLink.addEventListener("click", highScoresPage);


clearButton.addEventListener("click", function () {
    localStorage.clear();
    answer1.textContent = ""


})

gobackButton.addEventListener("click", function () {
    initPage();
});


function initPage() {
    clearContent();
    highScoresLink.textContent = "View Highscores";
    timer.textContent = "time: 0";
    question.textContent = "Coding Quiz Challenge";
    answer1.textContent = "Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score timer by ten seconds!";
    answer2.append(startButton);
}

function highScoresPage() {
    event.preventDefault();
    clearContent();
    highScoresLink.textContent = "";
    timer.textContent = "";

    var highScores = {
        initial: userInput.value,
        score: timeLeft
    }

    if (userInput.value === "") {
        return
    }

    localStorage.setItem("highScores", JSON.stringify(highScores));

    var LastPlayer = localStorage.getItem("highScores");
    var newLastPlayer = JSON.parse(LastPlayer);

    question.textContent = "High Scores";
    answer1.textContent = newLastPlayer.initial + " " + newLastPlayer.score;
    answer2.appendChild(gobackButton);
    answer2.appendChild(clearButton);

}


