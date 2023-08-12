import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { MazeSquare } from './MazeSquare';


@Component({
  selector: 'app-play-maze',
  templateUrl: './play-maze.component.html',
  styleUrls: ['./play-maze.component.scss']
})

export class PlayMazeComponent {
  mazeList : MazeSquare[][];

  soluong:number = 9;
  // isDisabled: boolean = false;
  input: string = "________4,1____9_7_,__37_28__,____7_26_,4_______8,_91_6____,__42_36__,_3_14___9,9________";
  x: String[] = [];
  // canBesolve: boolean = true;
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

  constructor() {
    this.mazeList = [];
    for (let i=0;i<9;i++) {
      this.mazeList[i] = [];
      for (let j=0;j<9;j++) {
        this.mazeList[i][j] = new MazeSquare("", true);
      }
    }

    console.log(this.mazeList);
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
    console.clear();
  }

  //-------------------------------------------------------------------
  //To fill the maze into the matrix
  fillMatrix() {
    this.mazeReady = true;
    // Define specific number of elements in each row
    const elementsInEachRow = this.soluong;
    // Initialize the array with certain number of rows
    const numRows = this.soluong;

    this.x = this.input.trim().split(',');
    for (let i = 0; i < numRows; i++) {
      for (let j = 0; j< elementsInEachRow;j++) {
        if (this.x[i].charAt(j) == "_") {
          this.mazeList[i][j].value = "";
          this.mazeList[i][j].isDisable = false;
        } else {
          this.mazeList[i][j].value = parseInt(this.x[i].charAt(j));
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
        title: 'Đồ Ngu',
        showConfirmButton: true,
        timer: 2506
      })
    } else {
      this.isSolve = true;

      if (!this.stopTime) {
        this.stopTime = true;
      }

      let alertMessage = 'Congratulation! You finish the quiz with ' + this.time;
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
  solution: string = "579638124,128459376,643712895,385974261,467321958,291865743,854293617,732146589,916587432";
  addSolution() {
    this.mazeReady = true;
    this.x = this.solution.trim().split(',');
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j< 9;j++) {
        if (this.x[i].charAt(j) == "0") {
          this.mazeList[i][j].value = 0;
          this.mazeList[i][j].isDisable = false;
        } else {
          this.mazeList[i][j].value = parseInt(this.x[i].charAt(j));
          this.mazeList[i][j].isDisable = true;
        }
      }
    }
  }

  //------------------------------------------------------------------
  chuot_bach_array: number[][] = [];
  counter: number = 0;
  path: [number, number, number][] = [];

  generatePuzzle(): void {
    this.chuot_bach_array = [];
    for (let i=0;i<9;i++) {
      this.chuot_bach_array[i] = [];
      for (let j=0;j<9;j++) {
        this.chuot_bach_array[i][j] = 0;
      }
    }

    this.printGrid('empty');
    this.generateSolution(this.chuot_bach_array);
    this.printGrid('full solution');
    // this.removeNumbersFromGrid();
    // this.printGrid('with removed numbers');
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
  shuffle(array: any[]): number[] {
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
// getNonEmptySquares(grid: number[][]): [number, number][] {
//   const nonEmptySquares: [number, number][] = [];
//   for (let i = 0; i < grid.length; i++) {
//     for (let j = 0; j < grid.length; j++) {
//       if (grid[i][j] !== 0) {
//         nonEmptySquares.push([i, j]);
//       }
//     }
//   }
//   shuffle(nonEmptySquares);
//   return nonEmptySquares;
// }

// removeNumbersFromGrid(): void {
//   const nonEmptySquares = this.getNonEmptySquares(this.grid);
//   let nonEmptySquaresCount = nonEmptySquares.length;
//   let rounds = 3;
//   while (rounds > 0 && nonEmptySquaresCount >= 17) {
//     const [row, col] = nonEmptySquares.pop() || [0, 0];
//     nonEmptySquaresCount--;
//     const removedSquare = this.grid[row][col];
//     this.grid[row][col] = 0;
//     const gridCopy = cloneDeep(this.grid);
//     this.counter = 0;
//     this.solvePuzzle(gridCopy);
//     if (this.counter !== 1) {
//       this.grid[row][col] = removedSquare;
//       nonEmptySquaresCount++;
//       rounds--;
//     }
//   }
// }
}
