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
  static generateField(height, width, percentage) {
    let col = height;
    let row = width;
    let totalSpace = col*row;
    let totalHut = Math.floor(percentage*totalSpace);
    let twodimArray = new Array(col).fill(null).map(() => new Array(row).fill(fieldCharacter));
    let randomNumbers = new Set();
    while(randomNumbers.size < totalHut) {
        randomNumbers.add(Math.floor(Math.random()*(totalSpace-2)+2));
    }
    const randomNumbersArray = Array.from(randomNumbers);
    twodimArray[0][0]=pathCharacter;
    let sign = hole;
    randomNumbersArray.forEach(
        function(randomNum,index) {
            if(index==randomNumbersArray.length-1) {
                sign=hat;
            }
            if(randomNum%row==0) {twodimArray[Math.trunc(randomNum/row)-1][width-1]=sign;}
            else {twodimArray[Math.trunc(randomNum/row)][(randomNum%row-1)]=sign;};
        });
    return twodimArray;

  }
}
const myField = new Field(Field.generateField(10,10,0.4));
myField.startGame();
//setInterval(()=>{process.stdout.write('\x1Bc')},3000);
//myField.print(Field.generateField(3,4,0.3));