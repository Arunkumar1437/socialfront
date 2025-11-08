import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollgenerationComponent } from './payrollgeneration.component';

describe('PayrollgenerationComponent', () => {
  let component: PayrollgenerationComponent;
  let fixture: ComponentFixture<PayrollgenerationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PayrollgenerationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PayrollgenerationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
