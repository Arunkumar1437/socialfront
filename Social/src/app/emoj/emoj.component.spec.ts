import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmojComponent } from './emoj.component';

describe('EmojComponent', () => {
  let component: EmojComponent;
  let fixture: ComponentFixture<EmojComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmojComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmojComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
