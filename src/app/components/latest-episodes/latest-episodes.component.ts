import { Component } from '@angular/core';
import { CardEpisodeComponent } from '../card-episode/card-episode.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { EpisodeHorizontalComponent } from "../episode-horizontal/episode-horizontal.component";
import { RouterLink } from '@angular/router';
import { Episode, User } from '../../interfaces/app.interfaces';
import { EpisodeService } from '../../services/episode.service';
import { LikeEpisodeService } from '../../services/likeEpisode-websocket.service';
import { UserService } from '../../services/user.service';
import { LikeEpisodeServiceRest } from '../../services/likeEpisode-rest.service';
@Component({
  selector: 'app-latest-episodes',
  standalone: true,
  imports: [RouterLink, CommonModule, EpisodeHorizontalComponent],
  templateUrl: './latest-episodes.component.html',
  styleUrl: './latest-episodes.component.css'
})
export class LatestEpisodesComponent {
  displayedEpisodesCount =4;
  episodes: Episode[] = [];
  private likeSubscription: any;
  private unlikeSubscription: any;

  likes: { [episodeId: number]: number } = {};

  likedEpisodes: { [episodeId: number]: boolean } = {};

  authorisedToLike!:boolean;


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

      // Vérifier si l'utilisateur est connecté avant d'écouter les WebSockets
      if (this.user && this.user.id) {
        this.authorisedToLike=true;
        this.subscribeToWebSockets();
      }
      else{
        this.authorisedToLike=false;

      }
    });

    this.episodeService.getAllEpisodesLatest().subscribe((data) => {
      this.episodes = data;
      console.log(this.episodes);
      this.episodes.forEach((episode) => {
        this.likes[episode.id] = episode.numberOfLikes;
      });
    });

    this.likeEpisodeServiceRest.getLikedEpisodesByUser().subscribe((likedEpisodes) => {
      likedEpisodes.forEach((episode) => {
        this.likedEpisodes[episode.id] = true;
      });
    });

    console.log('liked', this.likedEpisodes);
  }

  // Séparer la gestion des WebSockets dans une méthode
  private subscribeToWebSockets(): void {
    console.log('Connexion aux WebSockets pour:', this.user);

    // Gestion des likes en temps réel
    this.likeSubscription = this.likeEpisodeService.onLikeEpisode().subscribe((data) => {
      this.likes[data.episode] = data.numberOfLikes;
    });

    // Gestion des unlikes en temps réel
    this.unlikeSubscription = this.likeEpisodeService.onUnlikeEpisode().subscribe((data) => {
      this.likes[data.episode] = data.numberOfLikes;
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
