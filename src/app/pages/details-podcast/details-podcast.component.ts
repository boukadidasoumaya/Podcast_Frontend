import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SectionCustomComponent } from '../../components/section-custom/section-custom.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { CardEpisodeWithDetailsComponent } from '../../components/card-episode-with-details/card-episode-with-details.component';
import { CommentSectionComponent } from '../../components/comment-section/comment-section.component';
import { Comment, Episode, EpisodeId, Podcast, PodcastId, User } from '../../interfaces/app.interfaces';
import { EpisodeService } from '../../services/episode.service';
import { RelatedSectionComponent } from '../../components/related-section/related-section.component';
import { UserService } from '../../services/user.service';

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
export class DetailsPodcastComponent implements OnInit {
  episodeDetails!: Episode ;
  episodeId!: number ;
  podcastDetails: Podcast | null = null;
  currentUser!:Partial<User>;
  isOwner:boolean=false;


  constructor(
    private activatedRoute: ActivatedRoute,
    private episodeService: EpisodeService,
    private userService: UserService
  ) {}


  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.episodeId = +id;
        this.loadEpisodeDetails();
      }
    });
    this.userService.getCurrentUser().subscribe((user) => {
      this.currentUser = user;
      console.log('Utilisateur actuel:', this.currentUser);
    });


    console.log(this.episodeDetails.podcast)
  }

  loadEpisodeDetails(): void {
    if (this.episodeId) {
      this.episodeService.getEpisodeById(this.episodeId).subscribe({
        next: (episode: Episode) => {
          this.episodeDetails = episode;
          this.podcastDetails = episode.podcast;
          if(this.episodeDetails.podcast.user.id==this.currentUser.id){
            this.isOwner =true;
          }

        },
        error: (error) => {
          console.error('Error fetching episode details:', error);
        }
      });
    }}
    onEpisodeSelected(episodeId: number): void {
      this.episodeId = episodeId;
      console.log('Episode selected:', episodeId);

    }



    }
