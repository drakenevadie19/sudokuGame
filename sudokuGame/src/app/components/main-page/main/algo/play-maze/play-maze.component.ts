import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { MazeSquare } from './MazeSquare';
import { ShareService } from 'src/app/share.service';

class Coordinate {
  row: number;
  column: number;

  constructor(row: number, column: number) {
    this.row = row;
    this.column = column;
  }
}

@Component({
  selector: 'app-play-maze',
  templateUrl: './play-maze.component.html',
  styleUrls: ['./play-maze.component.scss']
})

export class PlayMazeComponent {
  mazeList : MazeSquare[][];

  soluong:number = 9;
  x: String[] = [];
  isSolve: boolean = false;

  gameStarted: boolean = false;
  mazeReady: boolean = false;

  time: string = "00:00:00";
  stopTime: boolean = true;
  second: string = "0";
  minute: string = "0";
  hour: string = "0";
  sec: number = 0;
  min: number = 0;
  hr: number = 0;

  checkButtonDisable: boolean= false;

  constructor(private shareService: ShareService) {
    this.mazeList = [];
    for (let i=0;i<9;i++) {
      this.mazeList[i] = [];
      for (let j=0;j<9;j++) {
        this.mazeList[i][j] = new MazeSquare("", true);
      }
    }

    console.log(this.mazeList);
    this.shareService.maze = [];
  }

  //-------------------------------------------------------------------
  //Timer
  timerCycle():void {
    if (this.stopTime == false) {
      this.sec = parseInt(this.second);
      this.min = parseInt(this.minute);
      this.hr = parseInt(this.hour);

      this.sec = this.sec +1;
      if (this.sec == 60) {
        this.min = this.min +1;
        this.sec = 0
      }
      if (this.min == 60) {
        this.hr = this.hr +1;
        this.min = 0;
        this.sec = 0;
      }
      if (this.sec < 10 || this.sec == 0) {
        this.second = "0" + this.sec;
      } else {
        this.second = this.sec.toString();
      }
      if (this.min < 10 || this.min == 0) {
        this.minute = "0" + this.min;
      } else {
        this.minute = this.min.toString();
      }
      if (this.hr < 10 || this.hr == 0) {
        this.hour = "0" + this.hr;
      } else {
        this.hour = this.hr.toString();
      }

      this.time = this.hour + ":" + this.minute + ":" + this.second;
      setTimeout(() => {
        this.timerCycle();
      }, 1000);
    }
  }

  //--------------------------------------------------------------------
  //Start-Pause-Continue
  startGame() {
    this.gameStarted = true;
    this.checkButtonDisable = false;
    if (this.stopTime == true) {
      this.stopTime = false;
      this.timerCycle();
    } else {
      this.stopTime = true;
    }
  }

  pauseGame() {
    this.gameStarted = true;
    this.checkButtonDisable = true;
    if (this.stopTime == true) {
      this.stopTime = false;
      this.timerCycle();
    } else {
      this.stopTime = true;
    }

    for (let i = 0; i < 9; i++) {
      for (let j = 0; j< 9;j++) {
        this.mazeList[i][j].isDisable = true;
      }
    }
  }

  continueGame() {
    this.gameStarted = true;
    this.checkButtonDisable = false;
    if (this.stopTime == true) {
      this.stopTime = false;
      this.timerCycle();
    } else {
      this.stopTime = true;
    }
  }

  //-------------------------------------------------------------------
  //Reset the maze and set button to start
  reset() {
    // this.canBesolve = true;
    this.isSolve = false;
    console.log(this.mazeList);

    //Reset the clock
    this.time= "00:00:00";
    this.gameStarted = false;
    this.stopTime = true;
    this.sec = 0;
    this.min = 0;
    this.hr = 0;
    this.second = "0";
    this.minute = "0";
    this.hour = "0";

    for (let i = 0; i < 9; i++) {
      for (let j = 0; j< 9;j++) {
        this.mazeList[i][j].value = "";
        this.mazeList[i][j].isDisable = true;
      }
    }

    for (let i = 0; i < 9; i++) {
      for (let j = 0; j< 9;j++) {
        this.solution[i][j] = 0;
      }
    }
    console.clear();
  }

  //-------------------------------------------------------------------
  //To fill the maze into the matrix
  fillMatrix() {
    this.mazeReady = true;
    this.generatePuzzle();
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j< 9;j++) {
        if (this.chuot_bach_array[i][j] == 0) {
          this.mazeList[i][j].value = "";
          this.mazeList[i][j].isDisable = false;
        } else {
          this.mazeList[i][j].value = this.chuot_bach_array[i][j];
          this.mazeList[i][j].isDisable = true;
        }
      }
    }

    this.gameStarted = true;
    this.checkButtonDisable = false;
    if (this.stopTime == true) {
      this.stopTime = false;
      this.timerCycle();
    }
  }

  checkSmallBox() {

  }
  //-----------------------------------------------------------------
  //Checking isValid?
  checkSolution() {
    let goodMaze: boolean = true;

    for (let i=0;i<9;i++) {
      for (let j=0;j<9;j++) {
        if (this.mazeList[i][j].value == "") {
          this.mazeList[i][j].value = 0;
        }

        for(let c1 = 0; c1 < 9; c1++) {
          if(c1 != j && this.mazeList[i][j].value == this.mazeList[i][c1].value) {
            // console.log("Pair ("+i+","+j+")="+this.mazeList[i][j]+"and " + "pair ("+i+","+c1+") = " + this.mazeList[i][c1]);
            goodMaze = false;
            break;
          }
        }

        for(let r1 = 0; r1 < 9; r1++) {
            if(r1 != i && this.mazeList[i][j].value == this.mazeList[r1][j].value) {
              // console.log("Pair ("+i+","+j+")="+this.mazeList[i][j]+"and " + "pair ("+r1+","+j+") = " + this.mazeList[r1][j]);
              goodMaze = false;
              break;
            }
        }

        let start_r = i - i%3;
        let start_c = j - j%3;
        for(let r1 = 0; r1 < 3; r1++){
            for(let c1 = 0; c1 < 3; c1++){
                if(i != (r1+start_r) && j != (c1+start_c) && this.mazeList[i][j].value  == this.mazeList[r1+start_r][c1+start_c].value) {
                  // console.log("Pair ("+i+","+j+")="+this.mazeList[i][j]+"and " + "pair ("+(r1+start_r)+","+(c1+start_c)+") = " + this.mazeList[r1+start_r][c1+start_c]);
                  goodMaze = false;
                  break;
                }
            }
        }

        if (this.mazeList[i][j].value == 0) {
          this.mazeList[i][j].value = "";
          this.mazeList[i][j].isDisable = false;
        }
      }
    }

    if (goodMaze == false) {
      this.isSolve = false;

      Swal.fire({
        icon: 'error',
        title: 'Please try again, I believe you can do it <span>&#9996;</span>',
        showConfirmButton: true,
        timer: 2506
      })
    } else {
      this.isSolve = true;

      if (!this.stopTime) {
        this.stopTime = true;
      }

      let alertMessage = 'Congratulation! You finish the quiz with ' + this.time + ' <span>&#128509;</span>';
      Swal.fire({
        icon: 'success',
        title: alertMessage,
        showConfirmButton: true,
        timer: 25060
      })
    }
  }

  //----------------------------------------------------------------
  //Add solution for testing
  solution:number[][] = [];
  addSolution() {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j< 9;j++) {
        this.mazeList[i][j].value = this.solution[i][j];
        this.mazeList[i][j].isDisable = true;
      }
    }
  }

  //------------------------------------------------------------------
  chuot_bach_array: number[][] = [];
  counter: number = 0;
  path: [number, number, number][] = [];

  mazeValid(): boolean {
    for(let i=0;i<9;i++) {
      for(let j=0;j<9;j++) {
        if (this.chuot_bach_array[i][j] == 0) {
          return false;
        }
      }
    }
    return true;
  }

  emptyMaze(): void {
    this.chuot_bach_array = [];
    for (let i=0;i<9;i++) {
      this.chuot_bach_array[i] = [];
      for (let j=0;j<9;j++) {
        this.chuot_bach_array[i][j] = 0;
      }
    }
  }

  generatePuzzle(): void {
    this.emptyMaze();
    this.printGrid('empty');
    while (!this.mazeValid()) {
      this.emptyMaze();
      this.generateSolution(this.chuot_bach_array);
    }
    this.solution = this.cloneDeep(this.chuot_bach_array);
    this.printGrid('full solution');
    this.removeNumbersFromGrid();
    this.printGrid('with removed numbers');

    this.shareService.updateMaze(this.chuot_bach_array, this.shareService.maze);
    console.log("Maze của ShareService");
    console.log(this.shareService.maze);
  }

  //Print the maze at current status
  printGrid(gridName?: string): void {
    if (gridName) {
      console.log(gridName);
    }
    this.chuot_bach_array.forEach(row => console.log(row));
  }

  //---------------------------------------------------------------------------
  //Step 1: Generate a maze
  shuffle(array: any[]): any[] {
    for (let i = array.length - 1;i>0;i--) {
        const j = Math.floor(Math.random() * (i+1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  generateSolution(chuot_bach_array: number[][]): boolean {
    let numberList = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    for (let i = 0; i < 81; i++) {
      const row = Math.floor(i / 9);
      const col = i % 9;
      if (chuot_bach_array[row][col] === 0) {
        //Shuffle the maze to get a random number
        numberList = this.shuffle(numberList);
        for (const number of numberList) {
          if (this.validLocation(chuot_bach_array, row, col, number)) {
            this.path.push([number, row, col]);
            chuot_bach_array[row][col] = number;

            const emptySquare: number[] = this.findEmptySquare(chuot_bach_array);
            if (emptySquare.length == 0) {
              return true;
            } else {
              if (this.generateSolution(chuot_bach_array)) {
                return true;
              }
            }
          }
        }
        break;
      }
    }
    var result: number[] = [];
    result = this.findEmptySquare(chuot_bach_array).length != 0 ? this.findEmptySquare(chuot_bach_array) : [0,0];
    chuot_bach_array[result[0]][result[1]] = 0;
    return false;
  }

  //----------------------------------------------------------------------------------
  //Check whether the solution is valid?
  validLocation(chuot_bach_array: number[][], row: number, col: number, number: number): boolean {
    if (this.numUsedInRow(chuot_bach_array, row, number)) {
      return false;
    } else if (this.numUsedInColumn(chuot_bach_array, col, number)) {
      return false;
    } else if (this.numUsedInSubgrid(chuot_bach_array, row, col, number)) {
      return false;
    }
    return true;
  }

  //Test cell in row
  numUsedInRow(chuot_bach_array: number[][], row: number, number: number): boolean {
    return chuot_bach_array[row].includes(number);
  }

  //Test cell in column
  numUsedInColumn(chuot_bach_array: number[][], col: number, number: number): boolean {
    for (let i = 0; i < 9; i++) {
      if (chuot_bach_array[i][col] === number) {
        return true;
      }
    }
    return false;
  }

  //Test cell in 3x3 div
  numUsedInSubgrid(chuot_bach_array: number[][], row: number, col: number, number: number): boolean {
    const subRow = Math.floor(row / 3) * 3;
    const subCol = Math.floor(col / 3) * 3;
    for (let i = subRow; i < subRow + 3; i++) {
      for (let j = subCol; j < subCol + 3; j++) {
        if (chuot_bach_array[i][j] === number) {
          return true;
        }
      }
    }
    return false;
  }

  //Looking for remained cells
  findEmptySquare(chuot_bach_array: number[][]): number[] {
    let result: number[] = [];
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (chuot_bach_array[i][j] === 0) {
          result.push(i);
          result.push(j)
          return result;
        }
      }
    }
    return result;
  }

// //----------------------------------------------------------------------------------
  getNonEmptySquares(chuot_bach_array: number[][]): Coordinate[] {
    let nonEmptySquares: Coordinate[] = [];
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (chuot_bach_array[i][j] !== 0) {
          let x = new Coordinate(i, j);
          nonEmptySquares.push(x);
        }
      }
    }
    nonEmptySquares = this.shuffle(nonEmptySquares);
    return nonEmptySquares;
  }

  cloneDeep(chuot_bach_array: number[][]): number[][] {
    let chuotbackCopy: number[][] = [];
    for (let i=0;i<9;i++) {
      chuotbackCopy[i] = [];
      for (let j=0;j<9;j++) {
        chuotbackCopy[i][j] = this.chuot_bach_array[i][j];
      }
    }
    return chuotbackCopy;
  }

  solvePuzzle(grid: number[][]): boolean {
    for (let i = 0; i < 81; i++) {
      const row = Math.floor(i / 9);
      const col = i % 9;
      if (grid[row][col] === 0) {
        for (let number = 1; number <= 9; number++) {
          if (this.validLocation(grid, row, col, number)) {
            grid[row][col] = number;
            const emptySquare = this.findEmptySquare(grid);
            if (emptySquare.length == 0) {
              this.counter++;
              break;
            } else {
              if (this.solvePuzzle(grid)) {
                return true;
              }
            }
          }
        }
        break;
      }
    }
    var result: number[] = [];
    result = this.findEmptySquare(this.chuot_bach_array).length != 0 ? this.findEmptySquare(this.chuot_bach_array) : [0,0];
    this.chuot_bach_array[result[0]][result[1]] = 0;
    return false;
  }

  removeNumbersFromGrid(): void {
    const nonEmptySquares = this.getNonEmptySquares(this.chuot_bach_array);
    // console.log(nonEmptySquares);
    // console.log(typeof(nonEmptySquares[0]))
    let nonEmptySquaresCount = nonEmptySquares.length;
    // console.log(nonEmptySquaresCount);
    console.log(nonEmptySquares.pop())
    let rounds = 3;
    let i = 0;
    while (rounds > 0 && nonEmptySquaresCount >= 17) {
      const x = nonEmptySquaresCount != 0 ? nonEmptySquares[i] : new Coordinate(0,0);
      console.log(x.row + " " + x.column);
      nonEmptySquaresCount--;
      i++;
      const removedSquare = this.chuot_bach_array[x.row][x.column];
      this.chuot_bach_array[x.row][x.column] = 0;
      const gridCopy = this.cloneDeep(this.chuot_bach_array);
      this.counter = 0;
      this.solvePuzzle(gridCopy);
      if (this.counter !== 1) {
        this.chuot_bach_array[x.row][x.column] = removedSquare;
        nonEmptySquaresCount++;
        rounds--;
      }
      console.log(this.chuot_bach_array);
    }
  }

}
