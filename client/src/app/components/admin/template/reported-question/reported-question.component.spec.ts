import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportedQuestionComponent } from './reported-question.component';

describe('ReportedQuestionComponent', () => {
  let component: ReportedQuestionComponent;
  let fixture: ComponentFixture<ReportedQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportedQuestionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportedQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
