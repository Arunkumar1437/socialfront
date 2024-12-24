import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskmangeComponent } from './taskmange.component';

describe('TaskmangeComponent', () => {
  let component: TaskmangeComponent;
  let fixture: ComponentFixture<TaskmangeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskmangeComponent]
    });
    fixture = TestBed.createComponent(TaskmangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
