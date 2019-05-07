var Word = require("./Word.js");
var inquirer = require("inquirer");

var letterArray = "abcdefghijklmnopqrstuvwxyz";

var movieArray = [
    "Taxi Driver",
    "Raging Bull",
    "Casino",
    "Goodfellas",
    "The Departed",
    "Shutter Island",
    "The Aviator",
    "The Wolf of Wall Street",
    "Gangs of New York",
    "Resevoir Dogs",
    "Pulp Fiction",
    "Jackie Brown",
    "Kill Bill",
    "Django Unchained",
    "Jaws",
    "Saving Private Ryan",
    "Schindlers List",
    "Raiders of the Lost Ark",
    "Jurassic Park",
    "The Goonies",
    "Catch Me If You Can",
    "Minority Report",
    "Back to the Future",
    "Blade Runner",
    "The Terminator",
    "Halloween",
    "The Exorcist",
    "Dazed and Confused",
    "Friday",
    "Fast Times at Ridgemont High",
    "Pirates of the Carribean",
    "The Empire Strikes Back"
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

                    }
            }
            
        })
    } else {
        console.log("You Win!\n");
    }
}

console.log(randomMovie);