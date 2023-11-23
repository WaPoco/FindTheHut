const direction = [[1,0],[-1,0],[0,-1],[0,1]];
const fieldCharacter = '░';
const pathCharacter = '*';
const hat = '^';
const { fieldA }  = require('./main.js');


class solve {
    constructor(field) {
        this.field = field;
    }
    check(position=[0,0],newPosition=[0,0]) {
        let result = false;
        if((newPosition[0] >= 0) & (newPosition[0] < this.field.length) & (newPosition[1]>=0) & (newPosition[1]< this.field[0].length) ) {
            if(this.field[newPosition[0]][newPosition[1]]==fieldCharacter) {
                this.field[newPosition[0]][newPosition[1]] = pathCharacter;
                let newDirection = [0,0];
                for(let i = 0; i < direction.length; i++) {
                    newDirection[0] = parseInt(newPosition[0])+parseInt(direction[i][0]);
                    newDirection[1] = parseInt(newPosition[1])+parseInt(direction[i][1]);
                    //console.log(newPosition,newDirection,position[0]!=newDirection[0],parseInt(position[1])!=newDirection[1]);
                    if(parseInt(position[0])!=newDirection[0] | parseInt(position[1])!=newDirection[1]) {
                        if(this.check(newPosition,newDirection)==true) {
                            result=true;
                            break;
                        }
                    }
                }
            } else if(this.field[newPosition[0]][newPosition[1]]==hat) {
                console.log("I found the hut!");
                console.log(this.field);
                return true;
            }
        }
    return result;  
    }
}
fieldA[0][0] = fieldCharacter;
const solver =  new solve(fieldA);
console.log(solver.check(),fieldA);
