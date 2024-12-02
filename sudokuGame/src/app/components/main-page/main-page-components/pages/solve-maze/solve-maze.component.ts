import { Component } from '@angular/core';
import { ShareService } from 'src/app/share.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-solve-maze',
  templateUrl: './solve-maze.component.html',
  styleUrls: ['./solve-maze.component.scss']
})

export class SolveMazeComponent {
  mazeList : any[][];
  soluong:number = 9;
  isDisabled: boolean = false;
  // input: string = "________4,1____9_7_,__37_28__,____7_26_,4_______8,_91_6____,__42_36__,_3_14___9,9________";
  // x: String[] = [];
  canBesolve: boolean = true;
  isSolve: boolean = false;

  constructor(private shareService: ShareService) {
    this.mazeList = [];
    this.shareService.maze = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];


    // Define specific number of elements in each row
    const elementsInEachRow = this.soluong;

    // Initialize the array with certain number of rows
    const numRows = this.soluong;

    for (let i = 0; i < numRows; i++) {
      this.mazeList[i] = Array(elementsInEachRow).fill(""); // Replace 0 with the default value you want for each element
    }

    // console.log(this.mazeList);
  }

  ngOnInit() {
    if (this.shareService.maze) {
      this.fillMatrix();
    } else {
      console.error("Maze data is not available yet.");
    }
  }

  fillMatrix() {
    console.log(this.shareService.maze);
    if (this.shareService.maze && Array.isArray(this.shareService.maze)) {
      for (let i = 0; i < 9; i++) {
        this.mazeList[i] = [];
        for (let j = 0; j < 9; j++) {
          if (this.shareService.maze[i] && this.shareService.maze[i][j] === 0) {
            this.mazeList[i][j] = "";
          } else if (this.shareService.maze[i] && this.shareService.maze[i][j] != null) {
            this.mazeList[i][j] = this.shareService.maze[i][j];
          } else {
            this.mazeList[i][j] = ""; // Fallback to default value
          }
        }
      }
    } else {
      console.error("shareService.maze is not properly initialized.");
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
    this.isDisabled = false;
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
      Swal.fire({
        icon: 'success',
        title: 'We finish it!!',
        showConfirmButton: true,
        timer: 25060
      })
      this.isSolve = true;
      this.canBesolve = true;
      this.isDisabled = true;
    } else {
      console.log("Solve Failed");
      this.isSolve = false;
      this.canBesolve = false;
    }
    console.log(this.mazeList);
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
