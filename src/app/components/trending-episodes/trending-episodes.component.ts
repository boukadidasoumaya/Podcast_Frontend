import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CardEpisodeComponent } from '../card-episode/card-episode.component';
import { CommonModule } from '@angular/common';
import { Episode, User } from '../../interfaces/app.interfaces';
import { EpisodeService } from '../../services/episode.service';
import { Subscription } from 'rxjs';
import { LikeEpisodeService } from '../../services/like.service';

@Component({
  selector: 'app-trending-episodes',
  standalone: true,
  imports: [CardEpisodeComponent, CommonModule, RouterLink],
  templateUrl: './trending-episodes.component.html',
  styleUrls: ['./trending-episodes.component.css']
})
export class TrendingEpisodesComponent implements OnInit, OnDestroy {
  episodes: Episode[] = [];
  private likeSubscription: any;
  private unlikeSubscription: any;

  // Nombre de likes pour chaque épisode
  likes: { [episodeId: number]: number } = {};

  // Track liked state for each episode
  likedEpisodes: { [episodeId: number]: boolean } = {};

  user: Partial<User> = {
    id: 1
  };

  constructor(
    private episodeService: EpisodeService,
    private likeEpisodeService: LikeEpisodeService
  ) {}

  ngOnInit(): void {
    this.episodeService.getAllEpisodes().subscribe((data) => {
      this.episodes = data;

      // Initialiser le nombre de likes et l'état like pour chaque épisode
      this.episodes.forEach((episode) => {
        this.likes[episode.id] = episode.numberOfLikes;
        this.likedEpisodes[episode.id] = false; // Default to not liked
      });
    });

    // Listen for likes in real-time and update the likes count for each episode
    this.likeSubscription = this.likeEpisodeService.onLikeEpisode().subscribe((data) => {
      data.totalLikes.forEach((likeData: any) => {
        this.likes[likeData.episode] = likeData.numberOfLikes;
        this.likedEpisodes[likeData.episode] = true;
      });
    });

    // Listen for unlikes and update the likes count accordingly
    this.unlikeSubscription = this.likeEpisodeService.onUnlikeEpisode().subscribe((data) => {
      data.totalLikes.forEach((likeData: any) => {
        this.likes[likeData.episode] = likeData.numberOfLikes;
        this.likedEpisodes[likeData.episode] = false;
      });
    });
  }

  ngOnDestroy(): void {
    this.likeSubscription?.unsubscribe();
    this.unlikeSubscription?.unsubscribe();
  }

  onLikeChanged(event: { isLiked: boolean, episode: Episode }): void {
    const { isLiked, episode } = event;

    if (isLiked) {
      this.likeEpisodeService.likeEpisode(this.user, episode);
    } else {
      this.likeEpisodeService.unlikeEpisode(this.user, episode);
    }
  }
}
