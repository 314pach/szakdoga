import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteModulComponent } from './delete-modul.component';

describe('DeleteModulComponent', () => {
  let component: DeleteModulComponent;
  let fixture: ComponentFixture<DeleteModulComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteModulComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteModulComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
