var timer = document.querySelector("#timer");
var highScoresLink = document.querySelector("#highScores");
var question = document.querySelector("#question");
var answers = document.querySelector("#answers");
var result = document.querySelector("#result");
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
    questionText: "Inside which HTML element do we put the JavaScript?",
    answersText: ["<script>", "<javascript>", "<js>", "<scripting>"],
    correctAnswer: "<scripting>"
}, {
    questionText: "Where is the correct place to insert a JavaScript?",
    answersText: ["Both the <head> section and the <body> section are correct", "The <head> section", "The <body> section", "the <html> section"],
    correctAnswer: "The <body> section"
}]



startButton.addEventListener("click", function () {
    var testduration = false;
    quizStart();
    startTimer();


})

//start the count-down timer
function startTimer() {
    timeLeft = 75;
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
    answers.innerHTML = "";
    result.innerHTML = "";

}

function scoreBoard() {
    question.textContent = "All done!";
    answers.textContent = "Your final score is " + timeLeft;
    result.textContent = "Your initials "
    result.appendChild(userInput);
    result.appendChild(submitButton);



}

submitButton.addEventListener("click", highScoresPage);

highScoresLink.addEventListener("click", highScoresPage);


clearButton.addEventListener("click", function () {
    localStorage.clear();
    answers.textContent = ""


})

gobackButton.addEventListener("click", function () {
    initPage();
});


function initPage() {
    clearContent();
    highScoresLink.textContent = "View Highscores";
    timer.textContent = "time: 0";
    question.textContent = "Coding Quiz Challenge";
    answers.textContent = "Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score timer by ten seconds!";
    result.append(startButton);
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
    answers.textContent = newLastPlayer.initial + " " + newLastPlayer.score;
    result.appendChild(gobackButton);
    result.appendChild(clearButton);

}

function quizStart() {
    counter = 0;
    console.log(counter);
    clearContent();
    question.textContent = jsQuestions[counter].questionText;
    for (let i = 0; i < jsQuestions[counter].answersText.length; i++) {
        const answerButton = document.createElement("button");
        answerButton.textContent = jsQuestions[counter].answersText[i];
        answerButton.classList.add("answerButton");
        answerButton.addEventListener("click", function () {
            console.log(answerButton.textContent);
            console.log(jsQuestions[counter].correctAnswer);
            if (answerButton.textContent === jsQuestions[counter].correctAnswer) {
                result.textContent = "Correct!";
            } else {
                result.textContent = "Incorrect!";
                timeLeft = timeLeft - 10;
                console.log(timeLeft);
            }
        })
        answers.appendChild(answerButton);



    }


}