import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeAccountsComponent } from './see-accounts.component';

describe('SeeAccountsComponent', () => {
  let component: SeeAccountsComponent;
  let fixture: ComponentFixture<SeeAccountsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeeAccountsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeeAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
