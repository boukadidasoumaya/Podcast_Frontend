import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CardEpisodeComponent } from '../card-episode/card-episode.component';
import { CommonModule } from '@angular/common';
import { Episode, User } from '../../interfaces/app.interfaces';
import { EpisodeService } from '../../services/episode.service';
import { Subscription } from 'rxjs';
import { LikeEpisodeService } from '../../services/likeEpisode-websocket.service';
import { LikeEpisodeServiceRest } from '../../services/likeEpisode-rest.service';
import { UserService } from '../../services/user.service';

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

  user: Partial<User> = {};


  constructor(
    private episodeService: EpisodeService,
    private likeEpisodeService: LikeEpisodeService,
    private likeEpisodeServiceRest:LikeEpisodeServiceRest,
    private userService:UserService

  ) {}

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe((user) => {
      this.user = user;
      console.log('Utilisateur actuel:', this.user);
    });
    // Récupération des épisodes tendances
    this.episodeService.getAllEpisodesTrending().subscribe((data) => {
      this.episodes = data;
      this.episodes.forEach((episode) => {
        this.likes[episode.id] = episode.numberOfLikes;
      });
    });

    // Récupération des épisodes likés par l'utilisateur
    this.likeEpisodeServiceRest.getLikedEpisodesByUser().subscribe((likedEpisodes) => {
      likedEpisodes.forEach((episode) => {
        this.likedEpisodes[episode.id] = true;
      });
    });
    console.log('liked',this.likedEpisodes),
    // Gestion des likes en temps réel
    this.likeSubscription = this.likeEpisodeService.onLikeEpisode().subscribe((data) => {
      data.totalLikes.forEach((likeData: any) => {
        this.likes[likeData.episode] = likeData.numberOfLikes;
        this.likedEpisodes[likeData.episode] = true;
      });
    });

    // Gestion des unlikes en temps réel
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
    this.likedEpisodes[episode.id] = isLiked;  
    if (isLiked) {
      this.likeEpisodeService.likeEpisode(this.user, episode);
    } else {
      this.likeEpisodeService.unlikeEpisode(this.user, episode);
    }
  }
}
