import { Component, OnInit } from '@angular/core';
import { ShareService } from 'src/app/share.service';

interface Person {
  author: string;
  text: string;
}

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})

export class HomePageComponent {
  signalSolve: boolean = true;
  signalPlay: boolean = false;

  constructor(private shareService: ShareService) {

  }

  generateQuotes() {

  }

  ngOnInit():void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    console.clear();
    this.shareService.solveSignal.subscribe(signal => {
      this.signalSolve = signal;
    });
    this.shareService.playMaze.subscribe(signal => this.signalPlay = signal);
  }

  sendTingleSolve() {
    this.shareService.changeSolveSignal(true);
    this.shareService.changePlaySignal(false);
  }

  sendTinglePlay() {
    this.shareService.changeSolveSignal(false);
    this.shareService.changePlaySignal(true);
  }
}
