import { LightningElement, api } from 'lwc';

export default class Simon extends LightningElement {

    @api gameArray = [];
    @api userArray = [];
    @api missedInputs = false;

    connectedCallback() {
        for (let i = 0; i <=10; i++) {
            let newNum = Math.ceil(Math.random * 4);
            this.gameArray.push(newNum);
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
        for (let i = 0; i <= this.userArray.length; i++) {
            if (this.userArray[i] !== this.gameArray[i]) {
                this.missedInputs = true;
                alert("Wrong input. Loser!");
                //Obviously we want to include more logic to denote that the user has lost
            }
            if (this.userArray.length == 10 && this.missedInputs == false) {
                alert("You won!");
                //This will check to see if the user has made 10 successful inputs. If they did, they won!
            } 
        }
    }
 

}