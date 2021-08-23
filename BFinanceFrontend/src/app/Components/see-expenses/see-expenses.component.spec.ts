import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeExpensesComponent } from './see-expenses.component';

describe('SeeExpensesComponent', () => {
  let component: SeeExpensesComponent;
  let fixture: ComponentFixture<SeeExpensesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeeExpensesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeeExpensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
