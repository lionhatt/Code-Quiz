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
var i = 0;

// display content of innital page when suer open the html
window.onload = initPage;


// the question set for the quiz, user can ater or add questions to the set
var jsQuestions = [{
    questionText: "Inside which HTML element do we put the JavaScript?",
    answersText: ["<script>", "<javascript>", "<js>", "<scripting>"],
    correctAnswer: "<scripting>"
}, {
    questionText: "Where is the correct place to insert a JavaScript?",
    answersText: ["Both the <head> section and the <body> section are correct", "The <head> section", "The <body> section"],
    correctAnswer: "The <body> section"
},{
    questionText: "What is the correct syntax for referring to an external script called \"xxx.js\"?",
    answersText: ["<script href=\"xxx.js\">", "<script src=\"xxx.js\">", "<script name=\"xxx.js\">"],
    correctAnswer: "<script src=\"xxx.js\">"
},{
    questionText: "How do you create a function in JavaScript?",
    answersText: ["function myFunction()", "function:myFunction()", "function = myFunction()"],
    correctAnswer: "function myFunction()"
},{
    questionText: "How to write an IF statement in JavaScript?",
    answersText: ["if i = 5", "if i = 5 then", "if i == 5 then", "if(i == 5)"],
    correctAnswer: "if(i == 5)"
}]


//start the quiz
startButton.addEventListener("click", function () {
    quizStart();
    startTimer();
})

//start the count-down timer, user can change the timeinterval
function startTimer() {
    timeLeft = 75;
    var timeInterval = setInterval(function () {
        timer.textContent = "time: " + timeLeft;
        timeLeft--;
        if (timeLeft <= 0 || i === jsQuestions.length) {
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

// function to display the score board content on the page 
function scoreBoard() {
    question.textContent = "All done!";
    answers.textContent = "Your final score is " + timeLeft;
    result.textContent = "Your initials "
    result.appendChild(userInput);
    result.appendChild(submitButton);
}

submitButton.addEventListener("click", highScoresPage);

highScoresLink.addEventListener("click", highScoresPage);

// button to clear the local storage
clearButton.addEventListener("click", function () {
    localStorage.clear();
    answers.textContent = ""
})

gobackButton.addEventListener("click", function () {
    initPage();
});

//function for the content of the initial page 
function initPage() {
    i = 0;
    clearContent();
    highScoresLink.textContent = "View Highscores";
    timer.textContent = "time: 0";
    question.textContent = "Coding Quiz Challenge";
    answers.textContent = "Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score timer by ten seconds!";
    result.append(startButton);
}

//function to display the content of the high socres page 
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

//function to use the array of questionsets to form the quiz and button 
function quizStart() {

    clearContent();
    question.textContent = jsQuestions[i].questionText;
    for (let k = 0; k < jsQuestions[i].answersText.length; k++) {
        const answerButton = document.createElement("button");
        answerButton.textContent = jsQuestions[i].answersText[k];
        answerButton.classList.add("answerButton");

        answers.appendChild(answerButton);
        answerButton.addEventListener("click", function () {
            if (answerButton.textContent === jsQuestions[i].correctAnswer) {
                result.textContent = "Correct!";  
            } else {
                result.textContent = "Incorrect!";
                timeLeft = timeLeft - 10;
            }
            setTimeout(function () {
                i++;
                quizStart();
            },1000)
        })
    }
}

