import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HeartIconComponent } from '../heart-icon/heart-icon.component';
import { CommentIconComponent } from '../comment-icon/comment-icon.component';
import { HeadphonesIconComponent } from '../headphones-icon/headphones-icon.component';
import { Episode, User } from '../../interfaces/app.interfaces';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SaveIconComponent } from "../save-icon/save-icon.component";

@Component({
  selector: 'app-card-episode',
  standalone: true,
  imports: [RouterModule, CommonModule, HeartIconComponent, CommentIconComponent, HeadphonesIconComponent, SaveIconComponent],
  templateUrl: './card-episode.component.html',
  styleUrls: ['./card-episode.component.css']
})
export class CardEpisodeComponent {
  @Input() episode!: Episode;
  @Input() numberOfLikes!: number;
  @Input() isLiked!: boolean;
  @Output() liked = new EventEmitter<{ isLiked: boolean, episode: Episode }>();
  constructor(){
    console.log('islikes',this.isLiked);
  }
  onListenChanged(isListened: boolean) {
    console.log('Lecture modifiée:', isListened);
  }

  // Modified method to emit the liked event
  onLikeChanged(liked: boolean) {
    this.liked.emit({ isLiked: liked, episode: this.episode });
  }


  onCommentChanged(isCommented: boolean) {
    console.log('Commentaire modifié:', isCommented);
  }
}
