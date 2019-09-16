import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InnerBoardComponent } from './inner-board.component';

describe('InnerBoardComponent', () => {
  let component: InnerBoardComponent;
  let fixture: ComponentFixture<InnerBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InnerBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InnerBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
