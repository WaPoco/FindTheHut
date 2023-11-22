const direction = [[1,0],[-1,0],[0,-1],[0,1]];
const fieldCharacter = '░';
const pathCharacter = '*';
const hat = '^';


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
                for(let i = 0; i < 4; i++) {
                    newDirection = (newPosition,direction)=>{return [newPosition[0]+direction[0],newPosition[1]+direction[1]];};
                    console.log(typeof(newDirection));
                    if(position[0]!=newDirection[0] & position[1]!=newDirection[1]) {
                        if(this.check(newPosition,newDirection)==true) {
                            result=true;
                            break;
                        }
                    }
                }
            } else if(this.field[newPosition[0]][newPosition[1]]==hat) {
                console.log("I found the hut!")
                return true;
            }
        }
    return result;  
    }
}
const solver =  new solve([['░','░','^'],['O','O','O'],['O','O','O']]);
console.log(solver.check());