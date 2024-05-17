import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchCardsetComponent } from './search-cardset.component';

describe('SearchCardsetComponent', () => {
  let component: SearchCardsetComponent;
  let fixture: ComponentFixture<SearchCardsetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchCardsetComponent]
    });
    fixture = TestBed.createComponent(SearchCardsetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
