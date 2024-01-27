import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ShareService } from 'src/app/share.service';


@Component({
  selector: 'main-nav-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})

export class NavBarComponent {

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

  ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    console.clear();
    this.shareService.solveSignal.subscribe(signal => {
      this.signalSolve = signal;
      if (this.signalSolve) {
        let solveButton = document.getElementById("solve");
        console.log(solveButton);
        if (solveButton != null) {
          solveButton.style.borderBottom = '5px solid lime';
        }
      }
    });

    this.shareService.playSignal.subscribe(signal => {
      this.signalPlay = signal;
      if (this.signalPlay) {
        let playButton = document.getElementById("play");
        console.log(playButton);
        if (playButton != null) {
          playButton.style.borderBottom = '5px solid lime';
        }
      }
    });
  }

  sendTingleSolve() {
    this.shareService.changeSolveSignal(true);
    this.shareService.changePlaySignal(false);

    this.shareService.solveSignal.subscribe(signal => {
      this.signalSolve = signal;
      if (this.signalSolve) {
        let solveButton = document.getElementById("solve");
        console.log(solveButton);
        if (solveButton != null) {
          solveButton.style.borderBottom = '5px solid lime';
        }

        let playButton = document.getElementById("play");
        console.log(playButton);
        if (playButton != null) {
          playButton.style.borderBottom = 'none';
        }
      }
    });
  }

  sendTinglePlay() {
    this.shareService.changeSolveSignal(false);
    this.shareService.changePlaySignal(true);

    this.shareService.playSignal.subscribe(signal => {
      this.signalPlay = signal;
      if (this.signalPlay) {
        let playButton = document.getElementById("play");
        console.log(playButton);
        if (playButton != null) {
          playButton.style.borderBottom = '5px solid lime';
        }

        let solveButton = document.getElementById("solve");
        console.log(solveButton);
        if (solveButton != null) {
          solveButton.style.borderBottom = 'none';
        }
      }
    });
  }
}
