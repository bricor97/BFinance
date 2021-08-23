import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeCalendarComponent } from './see-calendar.component';

describe('SeeCalendarComponent', () => {
  let component: SeeCalendarComponent;
  let fixture: ComponentFixture<SeeCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeeCalendarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeeCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
