import { Component } from '@angular/core';
import { SwiperComponent } from '../components/swiper/swiper.component';
import { TopicsComponent } from '../components/topics/topics.component';
import { SectionCustomComponent } from '../components/section-custom/section-custom.component';
import { Input,Output } from '@angular/core';
import { Episode, User } from '../interfaces/app.interfaces';
import { EpisodeService } from '../services/episode.service';
import { takeUntil } from 'rxjs';
import { EventEmitter } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Subject } from 'rxjs';
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
    constructor(private route: ActivatedRoute,private episodeService: EpisodeService) {}
    ngOnInit(): void {
      this.route.params.pipe(takeUntil(this.destroy$)).subscribe((params) => {
        const episodeId = +params['id'];
        this.loadEpisodeinit(episodeId);
        this.loadRelatedEpisodes();
      });
      console.log(this.isOwner)
    }

    loadEpisodeinit(episodeId: number) {
      this.episodeService
        .getEpisodeById(episodeId)
        .pipe(takeUntil(this.destroy$))
        .subscribe((episode: Episode) => {
          this.currentEpisode = episode;
          this.podcastId = this.currentEpisode.podcast.id;
          this.loadRelatedEpisodes();
        });
    }

    loadRelatedEpisodes() {
      if (this.podcastId) {
        this.episodeService
          .getRelatedEpisodes(this.podcastId)
          .pipe(takeUntil(this.destroy$))
          .subscribe(
            (episodes: any[]) => {
              this.relatedEpisodes = episodes;
            },
            (error) => {
              console.error('Error fetching related episodes:', error);
            }
          );
      }
    }
    loadEpisode(episodeId: number) {
      this.episodeSelected.emit(episodeId); // Emit the episode ID to the parent component
    }

    ngOnDestroy(): void {
      this.destroy$.next();
      this.destroy$.complete();
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

  }
