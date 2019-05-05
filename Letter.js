// var inquirer = require("inquirer");

var Letter = function(value){
    this.letter = value;
    this.guess = false;
    this.toString = function(){
        if(this.letter === " ") {
            this.guess = true;
            return " ";
        } else {
            if (this.guess === false){
                return "_";
            } else {
                return this.letter;
            }
        }
    };

    
}