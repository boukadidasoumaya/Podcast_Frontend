import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SwiperComponent } from '../../components/swiper/swiper.component';
import { TopicsComponent } from '../../components/topics/topics.component';
import { SectionCustomComponent } from '../../components/section-custom/section-custom.component';
import { VidPlayerComponent } from '../../components/vid-player/vid-player.component';
import { CommentComponent } from '../../components/comment/comment.component';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { EpisodeService } from '../../services/episode.service';
import { Episode } from '../../interfaces/app.interfaces';
import { RelatedSectionComponent } from '../../components/related-section/related-section.component';
import { CommentSectionComponent } from '../../components/comment-section/comment-section.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-vid-page',
  standalone: true,
  imports: [RelatedSectionComponent,
    HttpClientModule,
    CommonModule,
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
podcastId!: number; // No changes here
episodeId: number | null = null;


  constructor(private router: Router,private route: ActivatedRoute, private episodeService: EpisodeService) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const episodeId = +params['id']; // Convert string to number using the "+" operator
      this.loadEpisode(episodeId);
    });
  }
  loadEpisode(episodeId: number) {
    this.episodeService.getEpisodeById(episodeId).subscribe({
      next: (episode: Episode) => {
        if (!episode) {
          this.router.navigate(['/404']); // Redirect to 404 page
          return;
        }
        this.currentEpisode = episode;
        this.podcastId = this.currentEpisode.podcast.id;
        this.loadRelatedEpisodes();
      },
      error: (error) => {
        console.error('Error fetching episode:', error);
        if (error.status === 404) {
          this.router.navigate(['/404']); // Redirect if episode not found
        }
      },
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
  console.log('selection')
this.loadEpisode(episodeId)

}


}
