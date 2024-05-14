import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizationCardsetComponent } from './visualization-cardset.component';

describe('VisualizationCardsetComponent', () => {
  let component: VisualizationCardsetComponent;
  let fixture: ComponentFixture<VisualizationCardsetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VisualizationCardsetComponent]
    });
    fixture = TestBed.createComponent(VisualizationCardsetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
