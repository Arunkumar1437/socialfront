import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeavedeclarationComponent } from './leavedeclaration.component';

describe('LeavedeclarationComponent', () => {
  let component: LeavedeclarationComponent;
  let fixture: ComponentFixture<LeavedeclarationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LeavedeclarationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LeavedeclarationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
