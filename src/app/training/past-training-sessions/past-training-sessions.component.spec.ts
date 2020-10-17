import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PastTrainingSessionsComponent } from './past-training-sessions.component';

describe('PastTrainingSessionsComponent', () => {
  let component: PastTrainingSessionsComponent;
  let fixture: ComponentFixture<PastTrainingSessionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PastTrainingSessionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PastTrainingSessionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
