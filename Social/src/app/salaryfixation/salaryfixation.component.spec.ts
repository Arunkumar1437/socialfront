import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaryfixationComponent } from './salaryfixation.component';

describe('SalaryfixationComponent', () => {
  let component: SalaryfixationComponent;
  let fixture: ComponentFixture<SalaryfixationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SalaryfixationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SalaryfixationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
