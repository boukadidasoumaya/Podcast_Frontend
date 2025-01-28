import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CommentComponent } from '../comment/comment.component';
import { SectionCustomComponent } from '../section-custom/section-custom.component';
import { SwiperComponent } from '../swiper/swiper.component';
import { TopicsComponent } from '../topics/topics.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { CardEpisodeWithDetailsComponent } from '../card-episode-with-details/card-episode-with-details.component';
import { CommentSectionComponent } from '../comment-section/comment-section.component';
import { Comment, Episode, EpisodeId, Podcast, PodcastId, User } from '../../interfaces/app.interfaces';
import { EpisodeService } from '../../services/episode.service';

@Component({
  selector: 'app-details-podcast',
  standalone: true,
  imports: [
    CommonModule,
    CommentComponent,
    SectionCustomComponent,
    SwiperComponent,
    TopicsComponent,
    NavbarComponent,
    CardEpisodeWithDetailsComponent,
    CommentSectionComponent
  ],
  templateUrl: './details-podcast.component.html',
  styleUrls: ['./details-podcast.component.css']
})
export class DetailsPodcastComponent implements OnInit {
  comments: Comment[] = [];
  episodeDetails: Episode | null = null;
  episodeId: number | null = null;
  podcastDetails: Podcast | null = null;


  displayedEpisodes = [
    {
      title: 'Episode 1',
      image: 'assets/images/podcast/11683425_4790593.jpg',
      description: 'First episode of the podcast series'
    },
    {
      title: 'Episode 2',
      image: 'assets/images/podcast/11683425_4790593.jpg',
      description: 'Second episode exploring new topics'
    },
    {
      title: 'Episode 3',
      image: 'assets/images/podcast/11683425_4790593.jpg',
      description: 'Diving deeper into the podcast theme'
    },
    {
      title: 'Episode 4',
      image: 'assets/images/podcast/11683425_4790593.jpg',
      description: 'Special guest interview'
    },
    {
      title: 'Episode 5',
      image: 'assets/images/podcast/11683425_4790593.jpg',
      description: 'Season finale highlights'
    }
  ];

  constructor(
    private activatedRoute: ActivatedRoute,
    private episodeService: EpisodeService
  ) {}

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
          console.log('details',episode);
          this.episodeDetails = episode;
          this.podcastDetails = episode.podcast;

        },
        error: (error) => {
          console.error('Error fetching episode details:', error);
        }
      });
    }
  }
}
