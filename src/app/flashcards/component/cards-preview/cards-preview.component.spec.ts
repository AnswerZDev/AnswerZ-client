import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsPreviewComponent } from './cards-preview.component';

describe('CardsPreviewComponent', () => {
  let component: CardsPreviewComponent;
  let fixture: ComponentFixture<CardsPreviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardsPreviewComponent]
    });
    fixture = TestBed.createComponent(CardsPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
