var Word = require("./Word.js");
var inquirer = require("inquirer");

var letterArray = "abcdefghijklmnopqrstuvwxyz";

var movieArray = [
    "taxi driver",
    "raging bull",
    "casino",
    "goodfellas",
    "the departed",
    "shutter island",
    "the aviator",
    "the wolf of wall street",
    "gangs of new york",
    "resevoir dogs",
    "pulp fiction",
    "jackie brown",
    "kill bill",
    "django unchained",
    "jaws",
    "saving private ryan",
    "schindlers list",
    "raiders of the lost ark",
    "jurassic park",
    "the goonies",
    "catch me if you can",
    "minority report",
    "back to the future",
    "blade runner",
    "the terminator",
    "halloween",
    "the exorcist",
    "dazed and confused",
    "friday",
    "fast times at ridgemont high",
    "pirates of the carribean",
    "the empire strikes back"
];

var randomChoice = Math.floor(Math.random() * movieArray.length);
var randomMovie = movieArray[randomChoice];

var computerChoice = new Word(randomMovie);

var requireNewChoice = false;
var incorrectLetters = [];
var correctLetters = [];

var guessesLeft = 10;

function Game(){
    if (requireNewChoice){
        var randomChoice = Math.floor(Math.random() * movieArray.length);
        var randomMovie = movieArray[randomChoice];

         computerChoice = new Word(randomMovie);
         requireNewChoice = false;
    }

    var completedWord = [];

    if (completedWord.includes(false)) {
        inquirer.prompt([
            {
                type: "input",
                message: "Choose a letter",
                name: "userInput"
            }
        ]).then(function(input){
            if (!letterArray.includes(input.userinput) || input.userinput.length > 1){
                console.log("\nGuess Again\n");
                Game();
            } else {
                if (incorrectLetters.includes(input.userinput) || correctLetters.includes(input.userinput) ||
                    input.userinput === "") {
                        console.log("\nThat letter was already guessed\n");
                        Game();
                    } else {
                        var wordCheckArray = [];

                        computerChoice.userGuess(input.userinput);
                        computerChoice.objArray.forEach(wordCheck);
                        if (wordCheckArray.join("") === completedWord.join("")) {
                            console.log("\nIncorrect\n");

                            incorrectLetters.push(input.userinput);
                            guessesLeft--;
                        } else {
                            console.log("\nCorrect\n");

                            correctLetters.push(input.userinput);
                        }
                        computerChoice();

                        console.log("Guesses Left: " + guessesLeft + "\n");

                        console.log("Letters Guessed: " + incorrectLetters.join(" ") + "\n");

                        if (guessesLeft > 0) {
                            Game();
                        }else {
                            console.log("You Lose\n");
                        }

                        function wordCheck(key) {
                            wordCheckArray.push(key.guessed);
                        }

                    }
            }
            
        });
    } else {
        console.log("You Win!\n");
    }

    function checkCompleted(key) {
        completedWord.push(key.guessed)
    }
}
function gameRestart(){
    inquirer.prompt([
        {
            type: "list",
            message: "Would you like to:",
            choices: ["Play Again?", "Exit?"],
            name: "restart"
        }
    ]).then(function(input){
        if (input.restart === "Play Again?"){
            requireNewChoice = true;
            incorrectLetters = [];
            correctLetters = [];
            guessesLeft = 10;
            Game();
        } else {
            return;
        }
    });
}

Game();
console.log(randomMovie);