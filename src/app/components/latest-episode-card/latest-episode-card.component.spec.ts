import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestEpisodeCardComponent } from './latest-episode-card.component';

describe('LatestEpisodeCardComponent', () => {
  let component: LatestEpisodeCardComponent;
  let fixture: ComponentFixture<LatestEpisodeCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LatestEpisodeCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LatestEpisodeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
