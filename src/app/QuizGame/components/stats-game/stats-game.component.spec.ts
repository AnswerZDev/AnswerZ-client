import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsGameComponent } from './stats-game.component';

describe('StatsGameComponent', () => {
  let component: StatsGameComponent;
  let fixture: ComponentFixture<StatsGameComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StatsGameComponent]
    });
    fixture = TestBed.createComponent(StatsGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
