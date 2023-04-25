import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateModulComponent } from './create-modul.component';

describe('CreateModulComponent', () => {
  let component: CreateModulComponent;
  let fixture: ComponentFixture<CreateModulComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateModulComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateModulComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
