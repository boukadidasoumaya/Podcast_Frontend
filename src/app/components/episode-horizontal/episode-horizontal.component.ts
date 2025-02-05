import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Input } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { HeartIconComponent } from '../shared/icons/heart-icon/heart-icon.component';
import { CommentIconComponent } from '../shared/icons/comment-icon/comment-icon.component';
import { HeadphonesIconComponent } from '../shared/icons/headphones-icon/headphones-icon.component';
import { Episode } from '../../interfaces/app.interfaces';
import { SubscribeButtonComponent } from '../shared/buttons/subscribe-button/subscribe-button.component';
import { RouterModule } from '@angular/router';
import { SaveIconComponent } from '../shared/icons/save-icon/save-icon.component';
@Component({
  selector: 'app-episode-horizontal',
  standalone: true,
  imports: [RouterModule, CommonModule, HeartIconComponent, CommentIconComponent, HeadphonesIconComponent, SubscribeButtonComponent, SaveIconComponent],
  templateUrl: './episode-horizontal.component.html',
  styleUrl: './episode-horizontal.component.css'
})
export class EpisodeHorizontalComponent {
    @Input() episode!:Episode;
    @Input() numberOfLikes!: number;
    @Input() isLiked: boolean = false; // Add this line
    @Output() liked = new EventEmitter<{ isLiked: boolean, episode: Episode }>();
    @Input() authorisedToLike!:boolean
    @Input() isSubscribed :boolean= false;
    @Output() subscribed = new EventEmitter<{ isSubscribed: boolean, episode:Episode}>
    @Input() subscribedEpisodes:{ [episodeId: number]: boolean } = {};


    subscribedEpisodess:{ [episodeId: number]: boolean } = this.subscribedEpisodes;
    @Output() unfavorite = new EventEmitter<number>();  // Emit episode ID when unfavorite

    // Événements lorsque l'utilisateur interagit avec les icônes
    onListenChanged(isListened: boolean) {
      console.log('Lecture modifiée:', isListened);
    }


    // Modified method to emit the liked event
    onLikeChanged() {
      this.isLiked = !this.isLiked;
      this.liked.emit({ isLiked: this.isLiked, episode: this.episode });
    }


    unfavoriteEpisode() {
      if (this.episode) {
        this.unfavorite.emit(this.episode.id);  // Emit the episode ID to the parent component
      }}
}

