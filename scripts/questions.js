var correctWrong = "";
var quiz = {
    question : "Commonly used data types DO NOT include:",
    options : ["strings", "booleans", "alerts", "numbers"],
    answerIndex : 2
};

function populateQuiz(quizQuestion, lastAnswerResult){
    // Get the DOM elements
    let questionElement = document.getElementById("question");
    let optionsElement = document.getElementById("options");
    let correctWrongElement = document.getElementById("correct-wrong");
    if((questionElement === null)||(optionsElement === null)||(correctWrongElement === null)){
        alert("Unable to populate Quiz fields");
        return;
    }

    // Populate question
    questionElement.textContent = quizQuestion.question;

    // Populate options
    for(let i=0; i<quizQuestion.options.length; i++){
        // Outer div for row:
        let rowEl = document.createElement("div");
        rowEl.className = "row m-2";

        // Inner div for option
        let optionEl = document.createElement("div");
        optionEl.className = "col-6 mx-auto text-left btn btn-primary text-white";
        optionEl.setAttribute("data-option",i);
        optionEl.textContent = i+". "+quizQuestion.options[i];

        // Add to Options to DOM
        rowEl.appendChild(optionEl);
        optionsElement.appendChild(rowEl);
    }

    // Populate right/wrong row
    correctWrongElement.textContent = lastAnswerResult;
};

populateQuiz(quiz, correctWrong);