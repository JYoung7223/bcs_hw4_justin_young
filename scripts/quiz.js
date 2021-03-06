/***** Declare variables/objects *****/
// This object will allow for creation of multiple questions
function Question(ask,options,answerIndex){
    this.ask = ask;
    this.options = options;
    this.answerIndex = answerIndex;
};
var quiz = []; // This array will hold the list of questions.
var currentQuestion = Question("",[],0); // holds the current question being asked
var timerInterval;
var secondsRemaining = 75;
var runningScore = 0;

/***** Get DOM elements *****/
let askElement = document.getElementById("ask");
let optionsElement = document.getElementById("options");
let correctWrongElement = document.getElementById("correct-wrong");
let runningScoreElement = document.getElementById("running-score");
let timerElement = document.getElementById("timer");
if ((askElement === null) ||
    (optionsElement === null) ||
    (correctWrongElement === null) ||
    (runningScoreElement === null) ||
    (timerElement === null)) {
    alert("Unable to populate Quiz fields");
}

/***** Add Event Listeners *****/
optionsElement.addEventListener("click", answeredQuestion);

/***** Helper functions *****/
// This function will initialize the questions for the quiz.  Ideally this would pull from file or API service, for now it is hard-coded.
function initQuiz(){
    // List of questions
    var q1 = new Question("Commonly used data types DO NOT include ___:", ["strings", "booleans", "alerts", "numbers"], 2);
    var q2 = new Question("The condition in an if / else statement is enclosed within ___:", ["quotes \" \"", "curly brackets { }", "paranthesis ( )", "square brackets [ ]"], 2);
    var q3 = new Question("Arrays in JavaScript can be used to store ___:", ["numbers and strings", "other arrays", "booleans", "all of the above"], 3);
    var q4 = new Question("String values must be enclosed within ___ when being assigned to variabls.", ["commas ,", "curly brackets { }", "quotes \" \"", "paranthesis ( )"], 2);
    var q5 = new Question("A very useful tool used during development and ebugging for printing content to the debugger is ___:", ["JavaScript", "Terminal/Bash", "for loops", "console.log"], 3);
    var q6 = new Question("A common way to navigate through an array is by using ___:", ["a for loop", "an if statement", "an else statement", "array.go"], 0);
    var q7 = new Question("You can see what type a variable is stored as by using ___:", ["<variable>.which", "<variable>.type", "typeof <variable>", "<variable>[0]"], 2);
    var q8 = new Question("You can use JavaScript to modify a web-pages' ___:", ["styling", "content", "behavior", "all of the above"], 3);
    var q9 = new Question("JavaScript files usually have the ___ extension", [".script", ".css", ".java", ".js"], 3);
    var q10 = new Question("JavaScript is outdated and rarely used in today's websites.", ["True", "False", "No way to know"], 1);
    // Add to quiz
    quiz.push(q1);
    quiz.push(q2);
    quiz.push(q3);
    quiz.push(q4);
    quiz.push(q5);
    quiz.push(q6);
    quiz.push(q7);
    quiz.push(q8);
    quiz.push(q9);
    quiz.push(q10);
};

// This function will pop a random question from the quiz to display
function pickQuestion(){
    if (quiz.length > 0){
        var qPicked = Math.floor(Math.random() * quiz.length);
        currentQuestion = quiz.splice(qPicked, 1)[0]; // remove 1 item at index qPicked (ie. question Asked) and stores it
        askQuestion(currentQuestion);
    }else{
        alert("No more questions");
        endQuiz();
    }
};

// This function will populate the question, options, correct/wrong response, and running score on the screen with given values.
function askQuestion(question) {
    // Populate question
    askElement.textContent = question.ask;

    // clear then populate options
    optionsElement.innerHTML = "";
    for (let i = 0; i < question.options.length; i++) {
        // Outer div for row:
        let rowEl = document.createElement("div");
        rowEl.className = "row m-2";

        // Inner div for option
        let optionEl = document.createElement("div");
        optionEl.className = "col-6 mx-auto text-left btn btn-primary text-white";
        optionEl.setAttribute("data-option", i);
        optionEl.textContent = i+1 + ". " + question.options[i];

        // Add Options to DOM
        rowEl.appendChild(optionEl);
        optionsElement.appendChild(rowEl);
    }

    // Populate right/wrong row will be done when question is answered

    // Populate running score
    runningScoreElement.textContent = "Score:" + runningScore;
};

// This function will be called when an option is clicked.
function answeredQuestion(event) {
    // Clear any Alerts then add to DOM
    let alertEl = document.createElement("div");
    alertEl.setAttribute("role","alert");
    alertEl.id = "alert-at-"+secondsRemaining;

    if(parseInt(event.target.getAttribute("data-option")) === currentQuestion.answerIndex){
        // Add Alert to DOM
        alertEl.className = "mx-auto alert alert-success";
        alertEl.textContent = "Correct!";
        runningScore+= 1;
    }else{
        alertEl.className = "mx-auto alert alert-danger";
        alertEl.textContent = "Wrong!";
        secondsRemaining-= 10;
    }
    correctWrongElement.appendChild(alertEl);

    // Close alert after 3 seconds
    setTimeout(function() {
        $("#"+alertEl.id).alert("close");
    },3000);
    pickQuestion();
};
// This function will start the timer
function reduceTimer(){
    secondsRemaining--;
    if(secondsRemaining <= 0){
        endQuiz();
    }
    timerElement.textContent = "Time:"+secondsRemaining + " sec";
}

// This function will handle starting the quiz
function startQuiz(){
    initQuiz();
    pickQuestion();
    // Start timer
    timerInterval = setInterval(reduceTimer,1000);
}
// This function will handle the ending of the quiz
function endQuiz(){
    console.log("ending quiz");
    clearInterval(timerInterval);
    // Give more points for doing it faster.
    if(secondsRemaining > 0){
        runningScore+= secondsRemaining;
    }
    localStorage.setItem("score",runningScore);
    window.location.replace("./score.html");
}

// Run quiz
startQuiz();