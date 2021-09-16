import { LightningElement, api } from 'lwc';
// import greenSound from '@salesforce/resourceUrl/GreenSound'; //gets the static resource
// import blueSound from '@salesforce/resourceUrl/BlueSound';
// import yellowSound from '@salesforce/resourceUrl/YellowSound';
// import redSound from '@salesforce/resourceUrl/RedSound';

export default class Simon extends LightningElement {

    @api gameArray = [];
    @api userArray = [];
    @api missedInputs = false;
    @api roundNumber = 0;
    gameIsActive = false;

    greenId;
    redId;
    blueId;
    yellowId;

    connectedCallback() {
        for (let i = 0; i <10; i++) {
            let newNum = Math.floor(Math.random() * 4) + 1;
            this.gameArray.push(newNum);
        }
        console.log("Green=1, Red=2, Blue=3, Yellow=4");
        console.log(this.gameArray);
    }

    renderedCallback() {
        this.greenId = this.template.querySelector(".top-left-green-button");
        this.redId = this.template.querySelector(".top-right-red-button");
        this.blueId = this.template.querySelector(".bottom-right-blue-button");
        this.yellowId = this.template.querySelector(".bottom-left-yellow-button");
        this.startGame();
    }

    async startGame(){
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
        for (let i=0; i<=this.roundNumber; i++) {
            if (this.gameArray[i]==1) {
                console.log("Green Button")
                this.flashColor(this.greenId);
                await this.sleep(500);
                this.reverseFlash(this.greenId);
                await this.sleep(500);
                
            } else if (this.gameArray[i]==2) {
                console.log("Red Button")
                this.flashColor(this.redId);
                await this.sleep(500);
                this.reverseFlash(this.redId);
                await this.sleep(500);
                
            } else if (this.gameArray[i]==3) {
                console.log("Blue Button")
                this.flashColor(this.blueId);
                await this.sleep(500);
                this.reverseFlash(this.blueId);
                await this.sleep(500);
                
            } else if (this.gameArray[i]==4) {
                console.log("Yellow Button")
                this.flashColor(this.yellowId);
                await this.sleep(500);
                this.reverseFlash(this.yellowId);
                await this.sleep(500);
               
            }
        }

        
        this.gameIsActive = true;
    }

    addGreen = function() {
        if (this.gameIsActive) {
            this.userArray.push(1);
            console.log("Green Clicked!");
            this.checkArrays();
        }
    }

    addRed = function() {
        if (this.gameIsActive) {
            this.userArray.push(2);
            console.log("Red Clicked!");
            this.checkArrays();
        }
    }

    addBlue = function() {
        if (this.gameIsActive) {
            this.userArray.push(3);
            console.log("Blue Clicked!");
            this.checkArrays();
        }
    }

    addYellow = function() {
        if (this.gameIsActive) {
            this.userArray.push(4);
            console.log("Yellow Clicked!");
            this.checkArrays();
        }
    }


    add4 = function() {
        this.userArray.push(4);
        checkArrays();
    }

    sleep=function(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }
      
      async flashColor(button) {
        console.log(button);
        // This makes the buttons turn white and stay that way until a hover or click.
        // A good first start for Id communication, but some flash intervals will need to be set somehow.
       
        button.style = "background-color: white"
        
      }

      reverseFlash(button) {
          console.log(button);
          if (button == this.greenId) {
            button.style = "background-color: green";
          } else if (button == this.redId) {
            button.style = "background-color: red"
        } else if (button == this.blueId) {
            button.style = "background-color: blue"
        } else {
            button.style = "background-color: yellow"
        }
      }
      

    // flashColor = function(button) {
    //     console.log(button);
    //     // This makes the buttons turn white and stay that way until a hover or click.
    //     // A good first start for Id communication, but some flash intervals will need to be set somehow.
    //     this.sleep(5000);
    //     button.style = "background-color: white"
    // }

    onHover = function(event) {
        event.target.style = "border-color: white";
    }

    offHover = function(event) {
        event.target.style = "border-color: black";
    }

    decreaseOpacity = function(event) {
        event.target.style = "opacity: 0.5; border-color: black;";
    }

    increaseOpacity = function(event) {
        event.target.style = "opacity: 1; border-color: white;";
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
            if (this.userArray.length == 10 && this.missedInputs == false) {
                alert("You won!");
                this.gameIsActive = false;
                //This will check to see if the user has made 10 successful inputs. If they did, they won!
            } 
            if(this.userArray[i]==this.gameArray[i]){
                //continue to next round
                this.missedInputs=false;
            }
        }

        if (this.missedInputs == false && this.userArray.length-1 == this.roundNumber) {
            this.roundNumber++;
            console.log("The Round Number is " + this.roundNumber);
            console.log(this.userArray);
            this.userArray = [];
            this.startGame();
        }

        if (this.userArray.length == 10 && this.missedInputs == false) {
            alert("You won!");
            this.gameIsActive = false;
            //This will check to see if the user has made 10 successful inputs. If they did, they won!
        } 
    }
}