import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SwiperComponent } from '../components/swiper/swiper.component';
import { TopicsComponent } from '../components/topics/topics.component';
import { SectionCustomComponent } from '../components/section-custom/section-custom.component';
import { VidPlayerComponent } from '../components/vid-player/vid-player.component';
import { CommentComponent } from '../components/comment/comment.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { EpisodeService } from '../services/vid-page.service';
import { HttpClientModule } from '@angular/common/http';
import { Episode } from '../models/episode.model';
import { CommentSectionComponent } from "../components/comment-section/comment-section.component";

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
    CommentSectionComponent
],
  providers: [EpisodeService], // Ensure EpisodeService is provided here
  templateUrl: './vid-page.component.html',
  styleUrls: ['./vid-page.component.css'],
})
export class VidPageComponent implements OnInit {
  @ViewChild('player') playerElement!: ElementRef;

currentEpisode!: Episode; // Ensure this matches the Episode interface
relatedEpisodes: Episode[] = []; // Related episodes should be an array of Episode
comments: any[] = []; // This can remain 'any[]' unless you create a specific comment model
podcastId!: string; // No changes here


  constructor(private route: ActivatedRoute, private episodeService: EpisodeService) {}

  ngOnInit() {
    console.log('innnnn')
    this.route.params.subscribe((params) => {
      const episodeId = +params['id']; // Convert string to number using the "+" operator
      this.podcastId = params['podcastId']; // Fetch podcastId from route params
      this.loadEpisode(episodeId);
    });
  }

  loadEpisode(episodeId: number) {
    this.episodeService.getEpisodeById(episodeId).subscribe((episode: Episode) => {
      console.log(episodeId)
      this.currentEpisode = episode; // TypeScript will ensure it matches the Episode interface
      console.log('Loaded Episode:', episode);
      this.loadRelatedEpisodes();
    });
  }
  

  loadRelatedEpisodes() {
    this.episodeService.getRelatedEpisodes(this.podcastId).subscribe(
      (episodes: any[]) => {
        this.relatedEpisodes = episodes;
        console.log('Relatedzz Episodes:', episodes); // Log to see the result

      },
      (error) => {
        console.error('Error fetching related episodes:', error); // Handle error
      }
    );
  }

  loadComments(episodeId: string) {
    this.episodeService.getComments(episodeId).subscribe((comments: any[]) => {
      this.comments = comments;
    });
  }
}
