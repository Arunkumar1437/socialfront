import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveentryComponent } from './leaveentry.component';

describe('LeaveentryComponent', () => {
  let component: LeaveentryComponent;
  let fixture: ComponentFixture<LeaveentryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LeaveentryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LeaveentryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
