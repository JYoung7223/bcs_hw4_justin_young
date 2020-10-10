/***** Declare variables/objects *****/
function Score(person,score){
    this.person = person;
    this.score = score;
}

/***** Get/Initialize DOM elements *****/
let scoreElement = document.getElementById("score");
scoreElement.textContent = localStorage.getItem("score")
let scoreFormElement = document.getElementById("score-form");

/***** Add Event Listeners *****/
scoreFormElement.addEventListener("submit", addScore);

/***** Helper functions *****/
// This function will add the score to the scoreboard
function addScore(event){
    event.preventDefault();
    let person = document.getElementById("initials").value;
    var scoreboard = localStorage.getItem("scoreboard");
    if(scoreboard === null){
        scoreboard = [];
    }else{
        scoreboard = JSON.parse(scoreboard);
    }
    scoreboard.push(new Score(person, scoreElement.textContent));

    // Store new scoreboard
    localStorage.setItem("scoreboard",JSON.stringify(scoreboard));

    // Redirect to scoreboard screen
    window.location.replace("./scoreboard.html");
};