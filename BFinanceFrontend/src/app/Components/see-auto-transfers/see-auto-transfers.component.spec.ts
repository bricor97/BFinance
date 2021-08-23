import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeAutoTransfersComponent } from './see-auto-transfers.component';

describe('SeeAutoTransfersComponent', () => {
  let component: SeeAutoTransfersComponent;
  let fixture: ComponentFixture<SeeAutoTransfersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeeAutoTransfersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeeAutoTransfersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
