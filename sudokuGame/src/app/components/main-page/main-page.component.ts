import { Component, OnInit } from '@angular/core';
import { ShareService } from 'src/app/share.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent {
  solve: boolean = false;
  play: boolean = false;

  constructor(private shareService: ShareService, private router: Router) {
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.shareService.solveSignal.subscribe(signal =>this.solve = signal);
    this.shareService.playMaze.subscribe(signal => this.play = signal);

    if (this.solve == true && this.play == false) {
      this.router.navigate(['/main/solveMaze']);
    } else {
      this.router.navigate(['/main/playMaze']);
    }

  }

  sendTingleSolve() {
  }

  sendTinglePlay() {
  }

}
