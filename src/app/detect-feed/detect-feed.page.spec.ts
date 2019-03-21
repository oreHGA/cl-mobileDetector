import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetectFeedPage } from './detect-feed.page';

describe('DetectFeedPage', () => {
  let component: DetectFeedPage;
  let fixture: ComponentFixture<DetectFeedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetectFeedPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetectFeedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
