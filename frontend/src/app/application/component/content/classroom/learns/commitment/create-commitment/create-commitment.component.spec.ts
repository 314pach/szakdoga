import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCommitmentComponent } from './create-commitment.component';

describe('CreateCommitmentComponent', () => {
  let component: CreateCommitmentComponent;
  let fixture: ComponentFixture<CreateCommitmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCommitmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateCommitmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
