import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeSubscriptionsComponent } from './see-subscriptions.component';

describe('SeeSubscriptionsComponent', () => {
  let component: SeeSubscriptionsComponent;
  let fixture: ComponentFixture<SeeSubscriptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeeSubscriptionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeeSubscriptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
