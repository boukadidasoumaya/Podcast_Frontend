import { Component } from '@angular/core';
import { SwiperComponent } from '../components/swiper/swiper.component';
import { TopicsComponent } from '../components/topics/topics.component';
import { SectionCustomComponent } from '../components/section-custom/section-custom.component';
import { Input,Output } from '@angular/core';
import { Episode } from '../interfaces/app.interfaces';
import { EpisodeService } from '../services/vid-page.service';
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

  @Output() episodeSelected = new EventEmitter<number>(); // Emits episode ID
     podcastId!: number; // Get podcastId from parent component
    @Input() currentEpisode!: Episode; // Get podcastId from parent component
    relatedEpisodes: Episode[] = []; // Related episodes array
    @Input() routerLink!: string | any[]; // Accepts string or array for routes

    constructor(private route: ActivatedRoute,private episodeService: EpisodeService) {}
    ngOnInit(): void {
      this.route.params.pipe(takeUntil(this.destroy$)).subscribe((params) => {
        const episodeId = +params['id'];
        this.loadEpisodeinit(episodeId);
        this.loadRelatedEpisodes();
      });
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
  }