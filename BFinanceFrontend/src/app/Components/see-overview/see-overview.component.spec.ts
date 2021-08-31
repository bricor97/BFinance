import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeOverviewComponent } from './see-overview.component';

describe('SeeOverviewComponent', () => {
  let component: SeeOverviewComponent;
  let fixture: ComponentFixture<SeeOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeeOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeeOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
