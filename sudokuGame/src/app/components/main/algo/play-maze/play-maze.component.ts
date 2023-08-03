import { Component } from '@angular/core';

@Component({
  selector: 'app-play-maze',
  templateUrl: './play-maze.component.html',
  styleUrls: ['./play-maze.component.scss']
})
export class PlayMazeComponent {
  mazeList : number[][];
  soluong:number = 9;
  isDisabled: boolean = false;
  input: string = "000000004,100009070,003702800,000070260,400000008,091060000,004203600,030140009,900000000";
  x: String[] = [];
  canBesolve: boolean = true;
  isSolve: boolean = false;

  started: boolean = false;

  time: string = "00:00:00";
  stopTime: boolean = true;
  second: string = "0";
  minute: string = "0";
  hour: string = "0";
  sec: number = 0;
  min: number = 0;
  hr: number = 0;


  constructor() {
    this.mazeList = [];

    // Define specific number of elements in each row
    const elementsInEachRow = this.soluong;

    // Initialize the array with certain number of rows
    const numRows = this.soluong;

    for (let i = 0; i < numRows; i++) {
      this.mazeList[i] = Array(elementsInEachRow).fill(0); // Replace 0 with the default value you want for each element
    }

    console.log(this.mazeList);
    // console.log(this.input);
  }

  //-------------------------------------------------------------------
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

      console.log("-" + this.second + "-" + this.minute + "-" + this.hour + "-");

      this.time = this.hour + ":" + this.minute + ":" + this.second;
      setTimeout(() => {
        this.timerCycle();
      }, 1000);
    }
  }

  //-------------------------------------------------------------------
  //To fill the maze into the matrix
  fillMatrix() {
    // Define specific number of elements in each row
    const elementsInEachRow = this.soluong;
    // Initialize the array with certain number of rows
    const numRows = this.soluong;

    this.x = this.input.trim().split(',');
    for (let i = 0; i < numRows; i++) {
      for (let j = 0; j< elementsInEachRow;j++) {
        if (this.x[i].charAt(j) == "0") {
          this.mazeList[i][j] = 0;
          this.isDisabled = false;
        } else {
          this.mazeList[i][j] = parseInt(this.x[i].charAt(j));
          this.isDisabled = true;
        }
      }
    }
  }

  //-----------------------------------------------------------------
  //Clear the maze and
  reset() {
    this.canBesolve = true;
    this.isSolve = false;
    console.log(this.mazeList);

    //Reset the clock
    this.time= "00:00:00";
    this.started = false;
    this.stopTime = true;
    this.sec = 0;
    this.min = 0;
    this.hr = 0;
    this.second = "0";
    this.minute = "0";
    this.hour = "0";

    for (let i = 0; i < 9; i++) {
      for (let j = 0; j< 9;j++) {
        this.mazeList[i][j] = 0;
      }
    }

    console.clear();
  }

  //-----------------------------------------------------------------
  //Processing core
  r: number = 0;
  c: number = 0;
  board: number[][] = [];
  count: number = 0;

  checkSolution() {
    this.started = true;
    console.log(this.mazeList);
    // if (this.solve(this.mazeList, 0 ,0)) {
    //   console.log("Solve Successfully");
    //   this.isSolve = true;
    //   this.canBesolve = true;
    // } else {
    //   console.log("Solve Failed");
    //   this.isSolve = false;
    //   this.canBesolve = false;
    // }
    // console.log(this.mazeList);
    // for (let i = 0; i < this.soluong; i++) {
    //   for (let j = 0; j < this.soluong; j++) {
    //     if (this.mazeList[i][j] != 0) {
    //       this.isDisabled = true;
    //     }
    //   }
    // }

    if (this.stopTime == true) {
      this.stopTime = false;
      this.timerCycle();
    } else {
      this.stopTime = true;
    }
  }

  solve(mazeList: number[][], r: number, c: number): boolean {
    if(c===9 && r === 8) {
      return true;
    }
    if(c === 9){
        c = 0;
        r++;
    }

    if (mazeList[r][c] != 0) {
      return this.solve(mazeList, r, c + 1);
    } else {
      for(let i = 1; i <= 9; i++){
        if(this.isValid(mazeList, r, c, i)){
          mazeList[r][c] = i;
          if(this.solve(mazeList, r, c+1)) return true;
        }
        mazeList[r][c] = 0;
      }
    }
    return false;
  }

  isValid(mazeList: number[][], r: number, c: number, val: number): boolean{
    for(let c1 = 0; c1 < 9; c1++) {
        if(c1 != c && val == mazeList[r][c1]) return false;
    }

    for(let r1 = 0; r1 < 9; r1++) {
        if(r1 != r && val == mazeList[r1][c]) return false;
    }

    let start_r = r - r%3;
    let start_c = c - c%3;
    for(let r1 = 0; r1 < 3; r1++){
        for(let c1 = 0; c1 < 3; c1++){
            if(r1 != r && c1 != c && val == mazeList[r1+start_r][c1+start_c]) return false;
        }
    }
    return true;
  }
}
