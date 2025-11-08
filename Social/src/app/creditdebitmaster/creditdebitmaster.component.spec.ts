import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditdebitmasterComponent } from './creditdebitmaster.component';

describe('CreditdebitmasterComponent', () => {
  let component: CreditdebitmasterComponent;
  let fixture: ComponentFixture<CreditdebitmasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreditdebitmasterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreditdebitmasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
