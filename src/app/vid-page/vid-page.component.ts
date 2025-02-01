import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SwiperComponent } from '../components/swiper/swiper.component';
import { TopicsComponent } from '../components/topics/topics.component';
import { SectionCustomComponent } from '../components/section-custom/section-custom.component';
import { VidPlayerComponent } from '../components/vid-player/vid-player.component';
import { CommentComponent } from '../components/comment/comment.component';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { EpisodeService } from '../services/vid-page.service';
import { Episode } from '../interfaces/app.interfaces';
import { RelatedSectionComponent } from '../related-section/related-section.component';
@Component({
  selector: 'app-vid-page',
  standalone: true,
  imports: [RelatedSectionComponent,
    HttpClientModule,
    CommonModule,
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
currentEpisode!: Episode; // Ensure this matches the Episode interface
relatedEpisodes: Episode[] = []; // Related episodes should be an array of Episode
comments: any[] = []; // This can remain 'any[]' unless you create a specific comment model
podcastId!: number; // No changes here
episodeId: number | null = null;


  constructor(private route: ActivatedRoute, private episodeService: EpisodeService) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const episodeId = +params['id']; // Convert string to number using the "+" operator
      this.loadEpisode(episodeId);
    });
  }

  loadEpisode(episodeId: number) {
    this.episodeService.getEpisodeById(episodeId).subscribe((episode: Episode) => {
      console.log(episodeId)
      this.currentEpisode = episode;
      this.podcastId =this.currentEpisode.podcast.id  // Fetch podcastId from route params
      // TypeScript will ensure it matches the Episode interface
      this.loadRelatedEpisodes();
    });
  }
  

  loadRelatedEpisodes() {
    this.episodeService.getRelatedEpisodes(this.podcastId).subscribe(
      (episodes: any[]) => {
        this.relatedEpisodes = episodes;

      },
      (error) => {
        console.error('Error fetching related episodes:', error); // Handle error
      }
    );
  }
// Method to handle the episode selection
onEpisodeSelected(episodeId: number) {
  this.episodeId = episodeId;
   this.loadEpisode(episodeId) 

}

  loadComments(episodeId: number) {
    this.episodeService.getComments(episodeId).subscribe((comments: any[]) => {
      this.comments = comments;
    });
  }
}
