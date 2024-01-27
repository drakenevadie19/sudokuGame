import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { PlayMazeComponent } from './components/main-page/main-page-components/pages/play-maze/play-maze.component';
import { SolveMazeComponent } from './components/main-page/main-page-components/pages/solve-maze/solve-maze.component';
import { AboutPageComponent } from './components/main-page/main-page-components/pages/about-page/about-page.component';

const routes: Routes = [
  { path: 'home', component: HomePageComponent},
  { path: 'main', component: MainPageComponent , children: [
    { path: '', redirectTo: 'solveMaze', pathMatch: 'full' },
    { path: 'solveMaze', component: SolveMazeComponent },
    { path: 'playMaze', component: PlayMazeComponent },
    { path: 'aboutme', component: AboutPageComponent }
  ]},
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: '**', redirectTo: 'home', pathMatch: 'full'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
