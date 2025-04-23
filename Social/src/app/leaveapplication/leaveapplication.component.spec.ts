import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveapplicationComponent } from './leaveapplication.component';

describe('LeaveapplicationComponent', () => {
  let component: LeaveapplicationComponent;
  let fixture: ComponentFixture<LeaveapplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LeaveapplicationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LeaveapplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
