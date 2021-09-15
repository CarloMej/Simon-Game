import { LightningElement, api } from 'lwc';

export default class Simon extends LightningElement {

    @api gameArray = [];
    @api userArray = [];
    @api missedInputs = false;
    @api roundNumber=0;

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
        for(let i =0;i<10;i++){
            //k will reference the machine output to the user, controlled by the current round number(i)
            for(let k=0;k<=i;k++){
                console.log(gameArray[k]);
            }
            //we need to pause here to listen for user input for this current round, pauses for 6 seconds, then calls the checkArrays func.
            setTimeout(checkArrays(),6000);
            if(missedInputs==true){
                break;
            }

            
            

          //i will increment here and move on to the next round if checkArrays is correct
        }

    }

  

    add1 = function() {
        this.userArray.push(1);
        checkArrays();
    }

    add2 = function() {
        this.userArray.push(2);
        checkArrays();
    }

    add3 = function() {
        this.userArray.push(3);
        checkArrays();
    }

    add4 = function() {
        this.userArray.push(4);
        checkArrays();
    }

    checkArrays = function() {
        for (let i = 0; i < this.userArray.length; i++) {
            if (this.userArray[i] !== this.gameArray[i]) {
                //sets missedInputs to true, and when control goes back to caller function startGame() loop should break
                this.missedInputs = true;
                alert("Wrong input. Loser!");
                //Obviously we want to include more logic to denote that the user has lost
            }
            else if(this.userArray[i]==this.gameArray[i]){
                    //continue to next round
                    this.missedInputs=false;

            }


            if (this.userArray.length == 10 && this.missedInputs == false) {
                alert("You won!");
                //This will check to see if the user has made 10 successful inputs. If they did, they won!
            } 
        }
    }
 

}