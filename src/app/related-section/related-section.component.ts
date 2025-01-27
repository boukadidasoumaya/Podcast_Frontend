import { Component } from '@angular/core';
import { SwiperComponent } from '../components/swiper/swiper.component';
import { TopicsComponent } from '../components/topics/topics.component';
import { SectionCustomComponent } from '../components/section-custom/section-custom.component';
import { Input,Output } from '@angular/core';
import { Episode } from '../interfaces/app.interfaces';
import { EpisodeService } from '../services/vid-page.service';
import { NgClass } from '@angular/common';
import { EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-related-section',
  standalone: true,
  imports: [SwiperComponent,TopicsComponent,SectionCustomComponent],
  templateUrl: './related-section.component.html',
  styleUrl: './related-section.component.css',
})
export class RelatedSectionComponent {
  @Output() episodeSelected = new EventEmitter<number>(); // Emits episode ID
     podcastId!: number; // Get podcastId from parent component
    @Input() currentEpisode!: Episode; // Get podcastId from parent component
    relatedEpisodes: Episode[] = []; // Related episodes array
  
    constructor(private route: ActivatedRoute,private episodeService: EpisodeService) {}
  
    ngOnInit(): void {
      console.log('dfghjklklklkl')
      this.route.params.subscribe((params) => {
        const episodeId = +params['id']; // Convert string to number using the "+" operator
      this.loadEpisodeinit(episodeId);
      this.loadRelatedEpisodes();});
    }
    loadEpisodeinit(episodeId: number) {
      this.episodeService.getEpisodeById(episodeId).subscribe((episode: Episode) => {
        console.log(episodeId)
        this.currentEpisode = episode; // TypeScript will ensure it matches the Episode interface
        console.log('Loaded Episode:', episode);
        this.podcastId=this.currentEpisode.podcast.id
        this.loadRelatedEpisodes();
      });
    }
    loadRelatedEpisodes() {
      if (this.podcastId) {
        this.episodeService.getRelatedEpisodes(this.podcastId).subscribe(
          (episodes: any[]) => {
            this.relatedEpisodes = episodes;
            console.log('Related Episodes:', episodes);
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
  }

