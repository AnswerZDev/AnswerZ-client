import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllCardsetComponent } from './all-cardset.component';

describe('AllCardsetComponent', () => {
  let component: AllCardsetComponent;
  let fixture: ComponentFixture<AllCardsetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllCardsetComponent]
    });
    fixture = TestBed.createComponent(AllCardsetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
