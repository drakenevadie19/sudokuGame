import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClockNowComponent } from './clock-now.component';

describe('ClockNowComponent', () => {
  let component: ClockNowComponent;
  let fixture: ComponentFixture<ClockNowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ClockNowComponent]
    });
    fixture = TestBed.createComponent(ClockNowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
