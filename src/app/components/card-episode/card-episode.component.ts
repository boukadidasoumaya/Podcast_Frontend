import { Component, Input } from '@angular/core';
import { HeartIconComponent } from '../heart-icon/heart-icon.component';
import { CommentIconComponent } from '../comment-icon/comment-icon.component';
import { HeadphonesIconComponent } from '../headphones-icon/headphones-icon.component';
import { Episode } from '../../interfaces/app.interfaces';


@Component({
  selector: 'app-card-episode',
  standalone: true,
  imports: [HeartIconComponent, CommentIconComponent, HeadphonesIconComponent], // Importation des composants
  templateUrl: './card-episode.component.html',
  styleUrls: ['./card-episode.component.css']
})
export class CardEpisodeComponent {
  @Input() episode!: Episode;



  // Événements lorsque l'utilisateur interagit avec les icônes
  onListenChanged(isListened: boolean) {
    console.log('Lecture modifiée:', isListened);
  }

  onLikeChanged(isLiked: boolean) {
    console.log('Like modifié:', isLiked);
  }

  onCommentChanged(isCommented: boolean) {
    console.log('Commentaire modifié:', isCommented);
  }
}
