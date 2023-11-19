const prompt = require('prompt-sync')({sigint: true});
const readline = require('readline');

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';
const step = {"d":[1,0],"u":[-1,0],"l":[0,-1],"r":[0,1]};

class Field {
  constructor(field) {
    this.field = field;
    this.position = [0,0];
    this.newPosition = [0,0];
  }
  print() {
    for(let i = 0; i< this.field.length;i++) {
      console.log(...this.field[i]);
    }
  }
  startGame() {
    let play = true;
    this.print();
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
            this.print();
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
  #randomNumber(min,max) {
    return Math.floor(Math.random()*(max-min))+min;
  }
  static generateField(height, width, percentage) {
    let col = width;
    let row = height;
    let twodimArray = new Array(col).fill(null).map(() => new Array(row).fill(''));
    
  }
}
const myField = new Field([
  ['*', '░', 'O'],
  ['░', 'O', '░'],
  ['░', '^', '░']]);
myField.startGame();
setInterval(()=>{process.stdout.write('\x1Bc')},3000);
