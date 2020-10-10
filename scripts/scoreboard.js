/***** Declare variables/objects *****/
function Score(person, score) {
    this.person = person;
    this.score = score;
}

/***** Get/Initialize DOM elements *****/
let clearScoreElement = document.getElementById("clear-scores");
let scoresElement = document.getElementById("scores");

/***** Add Event Listeners *****/
clearScoreElement.addEventListener("click", clearScores);

/***** Helper functions *****/
// This function will populate the DOM with the scores
function populateScoreboard(scores) {
    if (scores === null) {
        return;
    }

    sortScores(scores);
    // clear then populate scores
    scoresElement.innerHTML = "";
    for (let i = 0; i < scores.length; i++) {
        // Outer div for row:
        let rowEl = document.createElement("div");
        rowEl.className = "row mb-2 record";

        // Inner divs for score
        let positionEl = document.createElement("div");
        positionEl.className = "ml-auto mr-2 text-right text-secondary position";
        positionEl.textContent = i + 1;
        let personEl = document.createElement("div");
        personEl.className = "mx-auto mr-2 text-center text-secondary person";
        personEl.textContent = scores[i].person;
        let scoreEl = document.createElement("div");
        scoreEl.className = "mr-auto ml-2 text-right text-secondary score";
        scoreEl.textContent = scores[i].score;

        // Add Options to DOM
        rowEl.appendChild(positionEl);
        rowEl.appendChild(personEl);
        rowEl.appendChild(scoreEl);
        scoresElement.appendChild(rowEl);
    }
};
// This function will add the score to the scoreboard
function clearScores() {
    localStorage.removeItem("scoreboard");

    // Update DOM
    scoresElement.innerHTML = "";
};
// These function will take an score array and sort it by score
function sortScores(scores) {
    scores.sort(compareScore);
}
function compareScore(a, b) {
    if (parseInt(a.score) > parseInt(b.score)) {
        return -1;
    } else if (parseInt(a.score) < parseInt(b.score)) {
        return 1;
    } else {
        return 0;
    }
}

populateScoreboard(JSON.parse(localStorage.getItem("scoreboard")));