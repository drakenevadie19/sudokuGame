import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainMazeComponent } from './main-maze.component';

describe('MainMazeComponent', () => {
  let component: MainMazeComponent;
  let fixture: ComponentFixture<MainMazeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MainMazeComponent]
    });
    fixture = TestBed.createComponent(MainMazeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
