import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionCustomComponent } from './section-custom.component';

describe('SectionCustomComponent', () => {
  let component: SectionCustomComponent;
  let fixture: ComponentFixture<SectionCustomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionCustomComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SectionCustomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
