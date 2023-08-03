import { Component } from '@angular/core';

@Component({
  selector: 'app-solve-maze',
  templateUrl: './solve-maze.component.html',
  styleUrls: ['./solve-maze.component.scss']
})

export class SolveMazeComponent {
  mazeList : number[][];
  soluong:number = 9;
  isDisabled: boolean = false;
  input: string = "";
  x: String[] = [];
  canBesolve: boolean = true;
  isSolve: boolean = false;

  constructor() {
    this.mazeList = [];

    // Define specific number of elements in each row
    const elementsInEachRow = this.soluong;

    // Initialize the array with certain number of rows
    const numRows = this.soluong;

    for (let i = 0; i < numRows; i++) {
      this.mazeList[i] = Array(elementsInEachRow).fill(""); // Replace 0 with the default value you want for each element
    }

    console.log(this.mazeList);
    // console.log(this.input);
  }

  fillMatrix() {
    // Define specific number of elements in each row
    const elementsInEachRow = this.soluong;
    // Initialize the array with certain number of rows
    const numRows = this.soluong;

    this.x = this.input.trim().split(',');
    for (let i = 0; i < numRows; i++) {
      for (let j = 0; j< elementsInEachRow;j++) {
        if (this.x[i].charAt(j) == "_") {
          this.mazeList[i][j] = 0;
        } else {
          this.mazeList[i][j] = parseInt(this.x[i].charAt(j));
        }
      }
    }
  }

  clearMaze() {
    this.canBesolve = true;
    this.isSolve = false;

    this.mazeList = [];
    // Define specific number of elements in each row
    const elementsInEachRow = this.soluong;

    // Initialize the array with certain number of rows
    const numRows = this.soluong;

    for (let i = 0; i < numRows; i++) {
      this.mazeList[i] = Array(elementsInEachRow).fill(""); // Replace 0 with the default value you want for each element
    }
    for (let i = 0; i < this.soluong; i++) {
      for (let j = 0; j < this.soluong; j++) {
        this.isDisabled = false;
      }
    }

    console.clear();
  }

  printMaze() {
    console.log(this.mazeList);
  }

  //-----------------------------------------------------------------
  //Processing core
  r: number = 0;
  c: number = 0;
  board: number[][] = [];
  count: number = 0;

  solveMaze() {
    console.log(this.mazeList);
    if (this.solve(this.mazeList, 0 ,0)) {
      console.log("Solve Successfully");
      this.isSolve = true;
      this.canBesolve = true;
    } else {
      console.log("Solve Failed");
      this.isSolve = false;
      this.canBesolve = false;
    }
    console.log(this.mazeList);
    for (let i = 0; i < this.soluong; i++) {
      for (let j = 0; j < this.soluong; j++) {
        if (this.mazeList[i][j] != 0) {
          this.isDisabled = true;
        }
      }
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
