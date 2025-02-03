import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Input } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { HeartIconComponent } from '../heart-icon/heart-icon.component';
import { CommentIconComponent } from '../comment-icon/comment-icon.component';
import { HeadphonesIconComponent } from '../headphones-icon/headphones-icon.component';
import { Episode } from '../../interfaces/app.interfaces';
import { SubscribeButtonComponent } from '../subscribe-button/subscribe-button.component';
import { RouterModule } from '@angular/router';
import { SaveIconComponent } from "../save-icon/save-icon.component";
@Component({
  selector: 'app-episode-horizontal',
  standalone: true,
  imports: [RouterModule, CommonModule, HeartIconComponent, CommentIconComponent, HeadphonesIconComponent, SubscribeButtonComponent, SaveIconComponent],
  templateUrl: './episode-horizontal.component.html',
  styleUrl: './episode-horizontal.component.css'
})
export class EpisodeHorizontalComponent implements OnInit{
    @Input() episode!:Episode;
    @Input() numberOfLikes!: number;
    @Input() isLiked: boolean = false; // Add this line
    @Output() liked = new EventEmitter<{ isLiked: boolean, episode: Episode }>();
    @Output() unfavorite = new EventEmitter<number>();  // Emit episode ID when unfavorite

ngOnInit(): void {
    console.log('kdnfdnf',this.episode)
}
    // Événements lorsque l'utilisateur interagit avec les icônes
    onListenChanged(isListened: boolean) {
      console.log('Lecture modifiée:', isListened);
    }
    

    // Modified method to emit the liked event
    onLikeChanged() {
      this.isLiked = !this.isLiked;
      this.liked.emit({ isLiked: this.isLiked, episode: this.episode });
    }

    onCommentChanged(isCommented: boolean) {
      console.log('Commentaire modifié:', isCommented);
    }
    unfavoriteEpisode() {
      if (this.episode) {
        this.unfavorite.emit(this.episode.id);  // Emit the episode ID to the parent component
      }}
}

