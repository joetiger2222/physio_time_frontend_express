import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddnewdaysComponent } from './addnewdays.component';

describe('AddnewdaysComponent', () => {
  let component: AddnewdaysComponent;
  let fixture: ComponentFixture<AddnewdaysComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddnewdaysComponent]
    });
    fixture = TestBed.createComponent(AddnewdaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
