import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatedSectionComponent } from './related-section.component';

describe('RelatedSectionComponent', () => {
  let component: RelatedSectionComponent;
  let fixture: ComponentFixture<RelatedSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RelatedSectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RelatedSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
