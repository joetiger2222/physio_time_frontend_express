import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditdaysComponent } from './editdays.component';

describe('EditdaysComponent', () => {
  let component: EditdaysComponent;
  let fixture: ComponentFixture<EditdaysComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditdaysComponent]
    });
    fixture = TestBed.createComponent(EditdaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
