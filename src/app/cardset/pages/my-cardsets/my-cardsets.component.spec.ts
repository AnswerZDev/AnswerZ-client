import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCardsetsComponent } from './my-cardsets.component';

describe('MyCardsetsComponent', () => {
  let component: MyCardsetsComponent;
  let fixture: ComponentFixture<MyCardsetsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyCardsetsComponent]
    });
    fixture = TestBed.createComponent(MyCardsetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
