import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeBillsComponent } from './see-bills.component';

describe('SeeBillsComponent', () => {
  let component: SeeBillsComponent;
  let fixture: ComponentFixture<SeeBillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeeBillsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeeBillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
