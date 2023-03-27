import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssembleTeamComponent } from './assemble-team.component';

describe('AssembleTeamComponent', () => {
  let component: AssembleTeamComponent;
  let fixture: ComponentFixture<AssembleTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssembleTeamComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssembleTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
