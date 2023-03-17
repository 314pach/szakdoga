import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnsComponent } from './learns.component';

describe('LearnsComponent', () => {
  let component: LearnsComponent;
  let fixture: ComponentFixture<LearnsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LearnsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LearnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
