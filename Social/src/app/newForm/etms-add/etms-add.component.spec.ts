import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtmsAddComponent } from './etms-add.component';

describe('EtmsAddComponent', () => {
  let component: EtmsAddComponent;
  let fixture: ComponentFixture<EtmsAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EtmsAddComponent]
    });
    fixture = TestBed.createComponent(EtmsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
