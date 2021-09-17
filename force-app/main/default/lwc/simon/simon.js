import { LightningElement, api } from 'lwc';
// Get the static resources for each sound file.
import greenSound from '@salesforce/resourceUrl/GreenSound';
import blueSound from '@salesforce/resourceUrl/BlueSound';
import yellowSound from '@salesforce/resourceUrl/YellowSound';
import redSound from '@salesforce/resourceUrl/RedSound';
import winSound from '@salesforce/resourceUrl/WinSound';
import lossSound from '@salesforce/resourceUrl/LossSound';

export default class Simon extends LightningElement {

    @api buttonText = "Play!";
    @api gameArray = [];
    @api userArray = [];
    @api roundNumber = 1;
    readyForInput = false;

    // Game sounds.
    playBlueSound = new Audio(blueSound);
    playGreenSound = new Audio(greenSound);
    playYellowSound = new Audio(yellowSound);
    playRedSound = new Audio(redSound);
    playWinSound = new Audio(winSound);
    playLossSound = new Audio(lossSound);

    // References to the colored game buttons.
    greenButton;
    redButton;
    blueButton;
    yellowButton;

    // Render callback to get the colored buttons.
    renderedCallback() {
        this.greenButton = this.template.querySelector(".top-left-green-button");
        this.redButton = this.template.querySelector(".top-right-red-button");
        this.blueButton = this.template.querySelector(".bottom-right-blue-button");
        this.yellowButton = this.template.querySelector(".bottom-left-yellow-button");
    }

    // Starts the game and shuffles a new memory sequence.
    startGame() {
        this.buttonText = "Reset?";
        this.shuffleSequence();
        this.nextRound();
    }

    // Creates a random list of 10 integers ranging from 1-4. 
    shuffleSequence() {
        this.gameArray = [];
        this.userArray = [];
        this.roundNumber = 1;

        for (let i = 0; i < 10; i++) {
            let newNum = Math.floor(Math.random() * 4) + 1;
            this.gameArray.push(newNum);
        }
    }

    // Animates a flashing sequence for the current round before opening the game for user input.
    async nextRound(){
        for (let i = 0; i < this.roundNumber; i++) {
            if (this.gameArray[i]==1) {
                this.flashColor(this.greenButton);
                this.playGreenSound.play();
                await this.sleep(500);
                this.reverseFlash(this.greenButton);
                await this.sleep(500);
                
            } else if (this.gameArray[i]==2) {
                this.flashColor(this.redButton);
                this.playRedSound.play();
                await this.sleep(500);
                this.reverseFlash(this.redButton);
                await this.sleep(500);
                
            } else if (this.gameArray[i]==3) {
                this.flashColor(this.blueButton);
                this.playBlueSound.play();
                await this.sleep(500);
                this.reverseFlash(this.blueButton);
                await this.sleep(500);
                
            } else {
                this.flashColor(this.yellowButton);
                this.playYellowSound.play();
                await this.sleep(500);
                this.reverseFlash(this.yellowButton);
                await this.sleep(500);
            }
        }

        this.readyForInput = true;
    }

    // Handler for when the user selects green.
    addGreen = function() {
        if (this.readyForInput) {
            this.userArray.push(1);
            this.checkArrays();
        }
    }

    // Handler for when the user selects red.
    addRed = function() {
        if (this.readyForInput) {
            this.userArray.push(2);
            this.checkArrays();
        }
    }

    // Handler for when the user selects blue.
    addBlue = function() {
        if (this.readyForInput) {
            this.userArray.push(3);
            this.checkArrays();
        }
    }

    // Handler for when the user selects yellow.
    addYellow = function() {
        if (this.readyForInput) {
            this.userArray.push(4);
            this.checkArrays();
        }
    }

    // Sleep function used for game pauses.
    sleep=function(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    // Flashes the input button's color to white.
    async flashColor(button) {
        button.style = "background-color: white";
    }

    // Resets the input button's color.
    reverseFlash(button) {
        if (button == this.greenButton) {
            button.style = "background-color: green";
        } else if (button == this.redButton) {
            button.style = "background-color: red";
        } else if (button == this.blueButton) {
            button.style = "background-color: blue";
        } else {
            button.style = "background-color: yellow";
        }
    }

    onHover = function(event) {
        event.target.style = "border-color: white";
    }

    offHover = function(event) {
        event.target.style = "border-color: black";
    }

    decreaseOpacity = function(event) {
        if (this.readyForInput) {
            event.target.style = "opacity: 0.5; border-color: black;";
        }
    }

    increaseOpacity = function(event) {
        if (this.readyForInput) {
            event.target.style = "opacity: 1; border-color: white;";
        }
    }

    // Checks the user's input with the game's in order to determine win/loss conditions and round startups.
    async checkArrays() {
        // Check for incorrect inputs from the user.
        for (let i = 0; i < this.userArray.length; i++) {
            if (this.userArray[i] != this.gameArray[i]) {
                this.playLossSound.play();
                console.log(this.userArray);
                console.log(this.gameArray);
                this.readyForInput = false;
                this.buttonText = "Play Again?";
                return;
            }
        }

        // If no wrong inputs were detected, determine whether to move onto the next round or win the game.
        if (this.userArray.length == 10) {
            this.playWinSound.play();
            this.readyForInput = false;
            this.buttonText = "Play Again?";
            return;
        }
        else if (this.userArray.length == this.roundNumber) {
            this.roundNumber++;
            this.userArray = [];
            this.readyForInput = false;
            await this.sleep(900);
            this.nextRound();
        } 
    }
}