import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayAllQuestionsComponent } from './display-all-questions.component';

describe('DisplayAllQuestionsComponent', () => {
  let component: DisplayAllQuestionsComponent;
  let fixture: ComponentFixture<DisplayAllQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayAllQuestionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayAllQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
