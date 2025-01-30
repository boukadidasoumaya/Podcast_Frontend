import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SectionCustomComponent } from '../../components/section-custom/section-custom.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { CardEpisodeWithDetailsComponent } from '../../components/card-episode-with-details/card-episode-with-details.component';
import { CommentSectionComponent } from '../../components/comment-section/comment-section.component';
import { Comment, Episode, EpisodeId, Podcast, PodcastId, User } from '../../interfaces/app.interfaces';
import { EpisodeService } from '../../services/episode.service';
import { RelatedSectionComponent } from '../../related-section/related-section.component';

@Component({
  selector: 'app-details-podcast',
  standalone: true,
  imports: [
    CommonModule,
    RelatedSectionComponent,
    SectionCustomComponent,
    NavbarComponent,
    CardEpisodeWithDetailsComponent,
    CommentSectionComponent
  ],
  templateUrl: './details-podcast.component.html',
  styleUrls: ['./details-podcast.component.css']
})
export class DetailsPodcastComponent implements OnInit,OnDestroy {
  comments: Comment[] = [];
  episodeDetails: Episode | null = null;
  episodeId: number | null = null;
  podcastDetails: Podcast | null = null;

  currentUser: Partial<User> = {
    id: 1
  };


  constructor(
    private activatedRoute: ActivatedRoute,
    private episodeService: EpisodeService
  ) {}
  ngOnDestroy(): void {

  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.episodeId = +id;
        this.loadEpisodeDetails();
      }
    });
  }

  loadEpisodeDetails(): void {
    if (this.episodeId) {
      this.episodeService.getEpisodeById(this.episodeId).subscribe({
        next: (episode: Episode) => {
          this.episodeDetails = episode;
          this.podcastDetails = episode.podcast;

        },
        error: (error) => {
          console.error('Error fetching episode details:', error);
        }
      });
    }}
    onEpisodeSelected(episodeId: number) {
      this.episodeId = episodeId;

      console.log('Episode selected:', episodeId);}

    }
