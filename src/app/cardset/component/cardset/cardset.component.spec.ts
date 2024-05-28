import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsetComponent } from './cardset.component';

describe('CardsetComponent', () => {
  let component: CardsetComponent;
  let fixture: ComponentFixture<CardsetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardsetComponent]
    });
    fixture = TestBed.createComponent(CardsetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
