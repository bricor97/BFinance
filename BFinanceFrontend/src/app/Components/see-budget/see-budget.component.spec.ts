import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeBudgetComponent } from './see-budget.component';

describe('SeeBudgetComponent', () => {
  let component: SeeBudgetComponent;
  let fixture: ComponentFixture<SeeBudgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeeBudgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeeBudgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
