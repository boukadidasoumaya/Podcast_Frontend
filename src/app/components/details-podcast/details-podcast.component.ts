import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommentComponent } from '../comment/comment.component';
import { CommonModule } from '@angular/common';
import { SectionCustomComponent } from '../section-custom/section-custom.component';
import { SwiperComponent } from '../swiper/swiper.component';
import { TopicsComponent } from '../topics/topics.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { CardEpisodeWithDetailsComponent } from '../card-episode-with-details/card-episode-with-details.component';
import { CommentService } from '../../services/comment.service';
import { Comment,Episode, User } from '../../interfaces/app.interfaces';
import { EpisodeService } from '../../services/episode.service';
import { CommentSectionComponent } from '../comment-section/comment-section.component';

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
  styleUrl: './details-podcast.component.css'
 })
 export class DetailsPodcastComponent implements OnInit {
  comments: Comment[] = [];
  episodeDetails: Episode | null = null;
  episodeId: number | null = null;
  currentUser:Partial<User>={
    id:1
  }
  options = {
    "podcast": { "id": 1 },
    "episode": { "id": 1 }
  };

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
    console.log("router",this.activatedRoute.paramMap);
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');
      console.log("id",id);
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
          this.options.episode.id = episode.id;
        },
        error: (error) => {
          console.error('Error fetching episode details:', error);
        }
      });
    }
  }


 }
