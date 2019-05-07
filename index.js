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

console.log(randomMovie);