import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayMazeComponent } from './play-maze.component';

describe('PlayMazeComponent', () => {
  let component: PlayMazeComponent;
  let fixture: ComponentFixture<PlayMazeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlayMazeComponent]
    });
    fixture = TestBed.createComponent(PlayMazeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
