import { Component, Input, OnInit } from '@angular/core';
import { CardEpisodeComponent } from '../card-episode/card-episode.component';
import { CommonModule } from '@angular/common';  // Importation nécessaire
import { Episode } from '../../interfaces/app.interfaces';
import { EpisodeService } from '../../services/episode.service';

@Component({
  selector: 'app-trending-episodes',
  standalone: true,
  imports: [CardEpisodeComponent, CommonModule],  // Ajoute CommonModule ici
  templateUrl: './trending-episodes.component.html',
  styleUrls: ['./trending-episodes.component.css']
})
export class TrendingEpisodesComponent implements OnInit {
  episodes: Episode[] = [];

  constructor(private episodeService: EpisodeService) {}

  ngOnInit(): void {
    this.episodeService.getAllEpisodes().subscribe((data) => {
      this.episodes = data;
    });
  }

  incrementViews(id: number): void {
    this.episodeService.incrementViews(id).subscribe((response) => {
      const episode = this.episodes.find((ep) => ep.id === id);
      if (episode) {
        episode.views = response.views;
      }
    });
  }
}
