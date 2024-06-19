import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyQuizVisualizationComponent } from './my-quiz-visualization.component';

describe('MyQuizVisualizationComponent', () => {
  let component: MyQuizVisualizationComponent;
  let fixture: ComponentFixture<MyQuizVisualizationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyQuizVisualizationComponent]
    });
    fixture = TestBed.createComponent(MyQuizVisualizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
