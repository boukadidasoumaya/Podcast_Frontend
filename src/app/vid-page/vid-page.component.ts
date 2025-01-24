import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SwiperComponent } from '../components/swiper/swiper.component';
import { TopicsComponent } from '../components/topics/topics.component';
import { SectionCustomComponent } from '../components/section-custom/section-custom.component';
import { VidPlayerComponent } from '../components/vid-player/vid-player.component';
import { CommentComponent } from '../components/comment/comment.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { EpisodeService } from './vid-page.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-vid-page',
  standalone: true,
  imports: [
    SwiperComponent,
    HttpClientModule,
    CommonModule,
    TopicsComponent,
    CommentComponent,
    SectionCustomComponent,
    VidPlayerComponent,
  ],
  providers: [EpisodeService], // Ensure EpisodeService is provided here
  templateUrl: './vid-page.component.html',
  styleUrls: ['./vid-page.component.css'],
})
export class VidPageComponent implements OnInit {
  @ViewChild('player') playerElement!: ElementRef;

  currentEpisode: any;
  relatedEpisodes: any[] = [];
  comments: any[] = [];
  podcastId!: string; // Add this property

  constructor(private route: ActivatedRoute, private episodeService: EpisodeService) {}

  ngOnInit() {
    console.log('innnnn')
    this.route.params.subscribe((params) => {
      const episodeId = params['id'];
      this.podcastId = params['podcastId']; // Fetch podcastId from route params
      this.loadEpisode(episodeId);
    });
  }

  loadEpisode(episodeId: string) {
    this.episodeService.getEpisodeById(episodeId).subscribe((episode) => {
      this.currentEpisode = episode;
      this.loadRelatedEpisodes(episodeId);
      this.loadComments(episodeId);
    });
  }

  loadRelatedEpisodes(episodeId: string) {
    this.episodeService.getRelatedEpisodes(episodeId, this.podcastId).subscribe((episodes: any[]) => {
      this.relatedEpisodes = episodes;
    });
  }

  loadComments(episodeId: string) {
    this.episodeService.getComments(episodeId).subscribe((comments: any[]) => {
      this.comments = comments;
    });
  }
}
