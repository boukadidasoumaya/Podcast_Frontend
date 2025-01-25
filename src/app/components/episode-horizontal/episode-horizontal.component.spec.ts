import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpisodeHorizontalComponent } from './episode-horizontal.component';

describe('EpisodeHorizontalComponent', () => {
  let component: EpisodeHorizontalComponent;
  let fixture: ComponentFixture<EpisodeHorizontalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EpisodeHorizontalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EpisodeHorizontalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
