import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAutoTransferComponent } from './add-auto-transfer.component';

describe('AddAutoTransferComponent', () => {
  let component: AddAutoTransferComponent;
  let fixture: ComponentFixture<AddAutoTransferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAutoTransferComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAutoTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
