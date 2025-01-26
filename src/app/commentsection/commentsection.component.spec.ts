import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentsectionComponent } from './commentsection.component';

describe('CommentsectionComponent', () => {
  let component: CommentsectionComponent;
  let fixture: ComponentFixture<CommentsectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommentsectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CommentsectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
