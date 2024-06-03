import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizationQuestionQuizComponent } from './visualization-question-quiz.component';

describe('VisualizationQuestionQuizComponent', () => {
  let component: VisualizationQuestionQuizComponent;
  let fixture: ComponentFixture<VisualizationQuestionQuizComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VisualizationQuestionQuizComponent]
    });
    fixture = TestBed.createComponent(VisualizationQuestionQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
