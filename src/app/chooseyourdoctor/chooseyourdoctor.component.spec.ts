import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseyourdoctorComponent } from './chooseyourdoctor.component';

describe('ChooseyourdoctorComponent', () => {
  let component: ChooseyourdoctorComponent;
  let fixture: ComponentFixture<ChooseyourdoctorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChooseyourdoctorComponent]
    });
    fixture = TestBed.createComponent(ChooseyourdoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
