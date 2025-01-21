import { Component, Input } from '@angular/core';
import { HeartIconComponent } from '../heart-icon/heart-icon.component';
import { CommentIconComponent } from '../comment-icon/comment-icon.component';
import { HeadphonesIconComponent } from '../headphones-icon/headphones-icon.component';
import { SaveIconComponent } from "../save-icon/save-icon.component";

// episode.model.ts
interface Episode {
  imagePath: string;
  title: string;
  description: string;
  profileImage: string;
  profileName: string;
  profileRole: string;
  listensCount: string;
  likesCount: string;
  commentsCount: string;
}

@Component({
  selector: 'app-card-episode',
  standalone: true,
  imports: [HeartIconComponent, CommentIconComponent, HeadphonesIconComponent, SaveIconComponent], // Importation des composants
  templateUrl: './card-episode.component.html',
  styleUrls: ['./card-episode.component.css']
})
export class CardEpisodeComponent {
  @Input() episode!: Episode; // L'input est un objet contenant toutes les informations

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
