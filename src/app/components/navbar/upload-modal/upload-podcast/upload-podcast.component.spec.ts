import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadPodcastComponent } from './upload-podcast.component';

describe('UploadPodcastComponent', () => {
  let component: UploadPodcastComponent;
  let fixture: ComponentFixture<UploadPodcastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadPodcastComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UploadPodcastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
