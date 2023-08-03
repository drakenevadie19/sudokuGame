import { Component, OnInit } from '@angular/core';
import { ShareService } from 'src/app/share.service';

@Component({
  selector: 'app-main-maze',
  templateUrl: './main-maze.component.html',
  styleUrls: ['./main-maze.component.scss']
})
export class MainMazeComponent {
  signalSolve: boolean = true;
  signalPlay: boolean = false;

  constructor(private shareService: ShareService) {

  }

  ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    console.clear();
    this.shareService.solveSignal.subscribe(signal => {
      this.signalSolve = signal;
    });
    this.shareService.playMaze.subscribe(signal => this.signalPlay = signal);
  }
}
