import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomePageComponent } from './components/home-page/home-page.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { MainMazeComponent } from './components/main-page/main-page-components/main-maze/main-maze.component';
import { NavBarComponent } from './components/main-page/main-page-components/nav-bar/nav-bar.component';
import { SolveMazeComponent } from './components/main-page/main-page-components/pages/solve-maze/solve-maze.component';
import { PlayMazeComponent } from './components/main-page/main-page-components/pages/play-maze/play-maze.component';
import { AboutPageComponent } from './components/main-page/main-page-components/pages/about-page/about-page.component';

import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    MainPageComponent,
    MainMazeComponent,
    NavBarComponent,
    SolveMazeComponent,
    PlayMazeComponent,
    AboutPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
