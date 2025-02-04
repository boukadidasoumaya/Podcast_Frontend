import { Component } from '@angular/core';
import { SwiperComponent } from '../swiper/swiper.component';
import { TopicsComponent } from '../topics/topics.component';
import { SectionCustomComponent } from '../section-custom/section-custom.component';
import { Input,Output } from '@angular/core';
import { Episode, User } from '../../interfaces/app.interfaces';
import { EpisodeService } from '../../services/episode.service';
import { Subscription, takeUntil } from 'rxjs';
import { EventEmitter } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-related-section',
  standalone: true,
  imports: [SwiperComponent,TopicsComponent,SectionCustomComponent, RouterLink],
  templateUrl: './related-section.component.html',
  styleUrl: './related-section.component.css',
})
export class RelatedSectionComponent {
  private destroy$ = new Subject<void>();

    @Output() episodeSelected = new EventEmitter<number>();
     podcastId!: number;
    @Input() currentEpisode!: Episode;
    relatedEpisodes: Episode[] = [];
    @Input() routerLink!: string | any[];
    @Input() isOwner!:boolean;
    relatedEpisodesSubscription: Subscription | undefined;
    
    constructor(private route: ActivatedRoute,private episodeService: EpisodeService) {}
    ngOnInit(): void {
      this.route.params.subscribe({
        next: (params) => {
          const episodeId = +params['id'];
          console.log('inside related');
          console.log(this.currentEpisode);
          this.loadEpisodeinit(episodeId);
          this.loadRelatedEpisodes();
        },
        error: (error) => {
          console.error('Error fetching route parameters:', error);
        },
        complete: () => {
          console.log('Route params subscription completed');
        }
      });
      console.log(this.isOwner);
    }
    
    loadEpisodeinit(episodeId: number) {
      this.episodeService.getEpisodeById(episodeId).subscribe({
        next: (episode: Episode) => {
          this.currentEpisode = episode;
          this.podcastId = this.currentEpisode.podcast.id;
          this.loadRelatedEpisodes();
        },
        error: (error: any) => {
          console.error('Error fetching episode:', error);
        },
        complete: () => {
          console.log('Episode fetch completed');
        }
      });
    }

    loadRelatedEpisodes() {
      if (this.podcastId) {
        this.relatedEpisodesSubscription = this.episodeService
          .getRelatedEpisodes(this.podcastId)
          .subscribe({
            next: (episodes: any[]) => {
              this.relatedEpisodes = episodes;
            },
            error: (error) => {
              console.error('Error fetching related episodes:', error);
            }
          });
      }
    }
    
   
    loadEpisode(episodeId: number) {
      this.episodeSelected.emit(episodeId);
    }
  
    deleteEpisode(episodeId: number) {
        this.episodeService.deleteEpisode(episodeId).subscribe({
          next: () => {
            console.log(`Épisode ${episodeId} supprimé.`);
            this.relatedEpisodes = this.relatedEpisodes.filter(ep => ep.id !== episodeId);
          },
          error: (err) => console.error('Erreur de suppression:', err)
        });
      }
      ngOnDestroy(): void {
        // Manually unsubscribe from the related episodes subscription
        if (this.relatedEpisodesSubscription) {
          this.relatedEpisodesSubscription.unsubscribe();
        }}
  }
