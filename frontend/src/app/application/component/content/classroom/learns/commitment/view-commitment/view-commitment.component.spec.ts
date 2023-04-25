import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCommitmentComponent } from './view-commitment.component';

describe('ViewCommitmentComponent', () => {
  let component: ViewCommitmentComponent;
  let fixture: ComponentFixture<ViewCommitmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCommitmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewCommitmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
