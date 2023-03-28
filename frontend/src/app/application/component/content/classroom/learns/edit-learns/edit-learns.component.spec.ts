import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLearnsComponent } from './edit-learns.component';

describe('EditLearnsComponent', () => {
  let component: EditLearnsComponent;
  let fixture: ComponentFixture<EditLearnsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditLearnsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditLearnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
