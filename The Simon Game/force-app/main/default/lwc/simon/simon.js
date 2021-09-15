import { LightningElement, api } from 'lwc';

export default class Simon extends LightningElement {

    @api gameArray = [];
    @api userArray = [];
    @api missedInputs = false;
    @api roundNumber = 0;
    gameIsActive = false;

    connectedCallback() {
        for (let i = 0; i <10; i++) {
            let newNum = Math.ceil(Math.random * 4);
            this.gameArray.push(newNum);
        }

        this.startGame();
    }

    startGame = function(){
        //in the youtube demo the game lights up randomly, with random sounds to initialize the game
        //some logic for that here

        //start of the game
        //i will reference the total rounds in the game
        /*
        for(let i =0;i<10;i++){
            //k will reference the machine output to the user, controlled by the current round number(i)
            for(let k=0;k<=i;k++){
                console.log(this.gameArray[k]);
            }
            //we need to pause here to listen for user input for this current round, pauses for 6 seconds, then calls the checkArrays func.
            setTimeout(this.checkArrays(),6000);
            if(this.missedInputs==true){
                break;
            }

            //i will increment here and move on to the next round if checkArrays is correct
        }
        */

        this.gameIsActive = true;
    }

  
    addGreen = function() {
        if (gameIsActive) {
            this.userArray.push(1);
            this.checkArrays();
        }
    }

    addRed = function() {
        if (gameIsActive) {
            this.userArray.push(2);
            this.checkArrays();
        }
    }

    addBlue = function() {
        if (gameIsActive) {
            this.userArray.push(3);
            this.checkArrays();
        }
    }

    addYellow = function() {
        if (gameIsActive) {
            this.userArray.push(4);
            this.checkArrays();
        }
    }


    checkArrays = function() {
        for (let i = 0; i < this.userArray.length; i++) {
            if (this.userArray[i] !== this.gameArray[i]) {
                //sets missedInputs to true, and when control goes back to caller function startGame() loop should break
                this.missedInputs = true;
                alert("Wrong input. Better luck next time!");
                this.gameIsActive = false;
                //Obviously we want to include more logic to denote that the user has lost
            }
            else if(this.userArray[i]==this.gameArray[i]){
                //continue to next round
                this.missedInputs=false;
            }

            if (this.userArray.length == 10 && this.missedInputs == false) {
                alert("You won!");
                this.gameIsActive = false;
                this.userArray = [];
                this.gameArray = [];
                //This will check to see if the user has made 10 successful inputs. If they did, they won!
            } 
        }
    }
}