import { Component } from '@angular/core';
import { CardEpisodeComponent } from '../card-episode/card-episode.component';
import { LatestEpisodeCardComponent } from '../latest-episode-card/latest-episode-card.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { EpisodeHorizontalComponent } from "../episode-horizontal/episode-horizontal.component";
import { RouterLink } from '@angular/router';
import { Episode, User } from '../../interfaces/app.interfaces';
import { EpisodeService } from '../../services/episode.service';
import { LikeEpisodeService } from '../../services/like.service';
@Component({
  selector: 'app-latest-episodes',
  standalone: true,
  imports: [RouterLink, CommonModule, EpisodeHorizontalComponent],
  templateUrl: './latest-episodes.component.html',
  styleUrl: './latest-episodes.component.css'
})
export class LatestEpisodesComponent {
  displayedEpisodesCount =2;
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
    this.episodeService.getAllEpisodesLatest().subscribe((data) => {
      this.episodes = data;
      console.log(this.episodes);
      // Initialiser le nombre de likes et l'état like pour chaque épisode
      this.episodes.forEach((episode) => {
        this.likes[episode.id] = episode.numberOfLikes;
      });
    });

    // Listen for likes in real-time and update the likes count for each episode
    this.likeSubscription = this.likeEpisodeService.onLikeEpisode().subscribe((data) => {
      data.totalLikes.forEach((likeData: any) => {
        this.likes[likeData.episode] = likeData.numberOfLikes;
        this.likedEpisodes[likeData.episode] = true;
        console.log(this.likes);
        console.log(this.likedEpisodes);
      });
    });

    // Listen for unlikes and update the likes count accordingly
    this.unlikeSubscription = this.likeEpisodeService.onUnlikeEpisode().subscribe((data) => {
      data.totalLikes.forEach((likeData: any) => {
        this.likes[likeData.episode] = likeData.numberOfLikes;
        this.likedEpisodes[likeData.episode] = false;
        console.log(this.likes);
        console.log(this.likedEpisodes);


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

  episodesToShow() {
    return this.episodes.slice(0, this.displayedEpisodesCount);
  }
  isHomePage() {
    return true;
  }
}
