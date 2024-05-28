import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyPopUpComponent } from './modify-pop-up.component';

describe('ModifyPopUpComponent', () => {
  let component: ModifyPopUpComponent;
  let fixture: ComponentFixture<ModifyPopUpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModifyPopUpComponent]
    });
    fixture = TestBed.createComponent(ModifyPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
