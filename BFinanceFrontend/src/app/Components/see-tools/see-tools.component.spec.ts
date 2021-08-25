import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeToolsComponent } from './see-tools.component';

describe('SeeToolsComponent', () => {
  let component: SeeToolsComponent;
  let fixture: ComponentFixture<SeeToolsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeeToolsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeeToolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
