import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolveMazeComponent } from './solve-maze.component';

describe('SolveMazeComponent', () => {
  let component: SolveMazeComponent;
  let fixture: ComponentFixture<SolveMazeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SolveMazeComponent]
    });
    fixture = TestBed.createComponent(SolveMazeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
