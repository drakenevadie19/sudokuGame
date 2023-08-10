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
  quote_author: string = "";
  quote_text: string = "";

  getRandomInt(max: number): number {
    return Math.floor(Math.random() * max);
  }

  constructor(private shareService: ShareService) {
    //Fetch API from JSON Quotes API
    fetch("https://type.fit/api/quotes")
    .then(function(response) {
      return response.json();
    })
    .then((data) => {
      this.quote_author = data[this.getRandomInt(data.length-1)].author;
      this.quote_text = data[this.getRandomInt(data.length-1)].text;
    });
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
