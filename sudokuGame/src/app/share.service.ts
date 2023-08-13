import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareService {
  public solveMaze = new BehaviorSubject(true);
  public playMaze = new BehaviorSubject(false);
  solveSignal = this.solveMaze.asObservable();
  playSignal = this.playMaze.asObservable();

  constructor() { }

  changeSolveSignal(signal: boolean) {
    this.solveMaze.next(signal);
    console.log("This is solve Maze");
    this.solveSignal.subscribe(console.log);
  }

  changePlaySignal(signal: boolean) {
    this.playMaze.next(signal);
    console.log("This is play Maze");
    this.playSignal.subscribe(console.log);
  }

  //--------------------------------
  //For testing
  public maze: number[][] = [];

  updateMaze(array: number[][], maze: number[][]) {
    for (let i=0;i<9;i++) {
      this.maze[i] = [];
      for (let j=0;j<9;j++) {
        this.maze[i][j] = 0;
      }
    }

    for (let i=0;i<9;i++) {
      for (let j=0;j<9;j++) {
        maze[i][j] = array[i][j];
      }
    }
  }
}
