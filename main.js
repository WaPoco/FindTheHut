const prompt = require('prompt-sync')({sigint: true});
const readline = require('readline');
const { start } = require('repl');

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';
const step = {"d":[1,0],"u":[-1,0],"l":[0,-1],"r":[0,1]};
const direction = [[1,0],[-1,0],[0,-1],[0,1]];


class Field {
  constructor(field,startposition) {
    this.field = field;
    this.position = [...startposition];
    this.newPosition = [...startposition];
  }
  print(array) {
    for(let i = 0; i< array.length;i++) {
      console.log(...array[i]);
    }
  }
  startGame() {
    let play = true;
    this.print(this.field);
    let direction = prompt('Which way?');
    while (play) {
      while(!(direction=="l" || direction=="r" || direction=="u" || direction=="d")) {
        direction = prompt('Which way?');
        }
      this.newPosition[0] += step[direction][0];
      this.newPosition[1] += step[direction][1];
      const isInBox = (this.newPosition[0] >= 0) & (this.newPosition[0] < this.field.length) & (this.newPosition[1]>=0) & (this.newPosition[1]< this.field[0].length);
      if(isInBox) {
        let nextfield = this.field[this.newPosition[0]][this.newPosition[1]];
        switch(nextfield) {
          case hat:
            process.stdout.write("Congratulation! You found the hat!\n");
            play = false;
            break; 
          case hole:
            process.stdout.write("You fell into a hole! Game over!\n");
            play = false;
            break;
          case fieldCharacter:
            this.field[this.newPosition[0]][this.newPosition[1]] = pathCharacter;
            this.position[0] = this.newPosition[0];
            this.position[1] = this.newPosition[1];
            process.stdout.write('\x1Bc');
            this.print(this.field);
            break;
          case pathCharacter:
            this.position[0] = this.newPosition[0];
            this.position[1] = this.newPosition[1];
            break;
          }
      } else {
        process.stdout.write("Out of boundary! Game over!\n");
        play = false;
        }
        direction = "";
    }
  }
  static generateField(height, width, percentage, startposition) {
      let col = height;
      let row = width;
      let totalSpace = col*row;
      let totalHut = Math.floor(percentage*totalSpace);
      do {
      var twodimArray = new Array(col).fill(null).map(() => new Array(row).fill(fieldCharacter)); 
      let randomNumbers = new Set();
      while(randomNumbers.size < totalHut) {
        randomNumbers.add(Math.floor(Math.random()*(totalSpace-2)+2));
      }
      let randomNumbersArray = Array.from(randomNumbers);
      let sign = hole;
      randomNumbersArray.forEach(
        function(randomNum,index) {
            if(index==randomNumbersArray.length-1) {
                sign=hat;
            }
            if(randomNum%row==0) {twodimArray[Math.trunc(randomNum/row)-1][width-1]=sign;}
            else {twodimArray[Math.trunc(randomNum/row)][(randomNum%row-1)]=sign;};
          });
        } while(Field.check([...startposition],[...startposition],JSON.parse(JSON.stringify(twodimArray)))==false);
      twodimArray[startposition[0]][startposition[1]]=pathCharacter;
    return twodimArray;
}
  static check(position=[0,0],newPosition=[0,0],field) {
    let result = false;
    if((newPosition[0] >= 0) & (newPosition[0] < field.length) & (newPosition[1]>=0) & (newPosition[1]< field[0].length) ) {
      if(field[newPosition[0]][newPosition[1]]==fieldCharacter) {
            field[newPosition[0]][newPosition[1]] = pathCharacter;
            let newDirection = [0,0];
            for(let i = 0; i < direction.length; i++) {
                newDirection[0] = parseInt(newPosition[0])+parseInt(direction[i][0]);
                newDirection[1] = parseInt(newPosition[1])+parseInt(direction[i][1]);
                if(parseInt(position[0])!=newDirection[0] | parseInt(position[1])!=newDirection[1]) {
                    if(Field.check(newPosition,newDirection,field)==true) {
                        return true;
                    }
                }
            }
            if(result==false) {
                field[newPosition[0]][newPosition[1]] = fieldCharacter;
            }

        } else if(field[newPosition[0]][newPosition[1]]==hat) {
            return true;
        }
    }
    return result;  
  }
}
const startposition =  [Math.floor(Math.random()*10),Math.floor(Math.random()*10)];
const fieldA = Field.generateField(10,10,0.4,startposition);
const myField = new Field(fieldA,startposition);
myField.startGame();
//setInterval(()=>{process.stdout.write('\x1Bc')},3000);
