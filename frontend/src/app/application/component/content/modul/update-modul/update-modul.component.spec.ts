import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateModulComponent } from './update-modul.component';

describe('UpdateModulComponent', () => {
  let component: UpdateModulComponent;
  let fixture: ComponentFixture<UpdateModulComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateModulComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateModulComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
