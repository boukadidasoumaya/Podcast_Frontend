import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestEpisodesComponent } from './latest-episodes.component';

describe('LatestEpisodesComponent', () => {
  let component: LatestEpisodesComponent;
  let fixture: ComponentFixture<LatestEpisodesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LatestEpisodesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LatestEpisodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
