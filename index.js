var Word = require("./Word.js");
var inquirer = require("inquirer");

// Letters to choose from and the words to be guessed. Arrays to catch user guesses.

var letterArray = "abcdefghijklmnopqrstuvwxyz";

var incorrectLetters = [];
var correctLetters = [];

var guessesLeft = 7;


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
    "the godfather",
    "scarface",
    "inception",
    "interstellar",
    "the prestige",
    "halloween",
    "psycho",
    "the shawshank redemption",
    "the exorcist",
    "the shining",
    "alien",
    "the fly",
    "a fistful of dollars",
    "unforgiven",
    "the thing",
    "big trouble in little china",
    "dazed and confused",
    "friday",
    "the karate kid",
    "trading places",
    "beverly hills cop",
    "ghostbusters",
    "top gun",
    "batman",
    "the last dragon",
    "fast times at ridgemont high",
    "pirates of the carribean",
    "the empire strikes back"
];

// Random word generator

var randomIndex = Math.floor(Math.random() * movieArray.length);
var randomMovie = movieArray[randomIndex];

var computerChoice = new Word(randomMovie);

var requireNewWord = false;

// Main function that runs the game. Uses inquirer for user input and checks the letters guessed against letters
// in the random word. Runs restart function upon winning or losing.

function Game(){
    if (requireNewWord){
        var randomIndex = Math.floor(Math.random() * movieArray.length);
        var randomMovie = movieArray[randomIndex];

         computerChoice = new Word(randomMovie);
         requireNewWord = false;
    }

    var completedWord = [];
    computerChoice.objArray.forEach(completeCheck);

    if (completedWord.includes(false)) {
        inquirer.prompt([
            {
                type: "input",
                message: "Choose a letter",
                name: "userinput"
            }
        ]).then(function(input){
            if (!letterArray.includes(input.userinput) || input.userinput.length > 1){
                console.log("\nGuess Again\n");
                Game();
            } 
            else {
                if (incorrectLetters.includes(input.userinput) || correctLetters.includes(input.userinput) ||
                    input.userinput === "") {
                        console.log("\nThat letter was already guessed\n");
                        Game();
                    } else {
                        var wordCheckArray = [];

                        computerChoice.userGuess(input.userinput);

                        computerChoice.objArray.forEach(wordCheck);

                        if (wordCheckArray.join('') === completedWord.join('')) {
                            console.log("\nIncorrect\n");

                            incorrectLetters.push(input.userinput);
                            guessesLeft--;

                        } else {
                            console.log("\nCorrect\n");

                            correctLetters.push(input.userinput);
                        }

                        computerChoice.log();

                            console.log("Guesses Left: " + guessesLeft + "\n");

                            console.log("Letters Guessed: " + incorrectLetters.join(" ") + "\n");

                        if (guessesLeft > 0) {
                            Game();

                        } else {
                            console.log("You Lose....You needed a bigger boat\n");
                            restartGame();
                        }

                            function wordCheck(key) {
                            wordCheckArray.push(key.guessed);
                    }

                }
            }
            
        })
    } else {
        console.log("You Win!....You're the best around and nothing's gonna ever keep you down!\n");
        restartGame();
    }

    function completeCheck(key) {
        completedWord.push(key.guessed)
    }

}

// Function to restart the game upon winning or losing

function restartGame(){
    inquirer.prompt([
        {
            type: "list",
            message: "Would you like to:",
            choices: ["Play Again?", "Exit?"],
            name: "restart"
        }
    ]).then(function(input){
        if (input.restart === "Play Again?"){
            requireNewWord = true;
            incorrectLetters = [];
            correctLetters = [];
            guessesLeft = 10;
            Game();
        } else {
            return
        }
    })
}

// Main function call for running the game

Game();
