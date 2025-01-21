import { Component, Input } from '@angular/core';
import { HeartIconComponent } from '../heart-icon/heart-icon.component';
import { CommentIconComponent } from '../comment-icon/comment-icon.component';
import { HeadphonesIconComponent } from '../headphones-icon/headphones-icon.component';


@Component({
  selector: 'app-card-episode',
  standalone: true,
  imports: [HeartIconComponent, CommentIconComponent, HeadphonesIconComponent], // Importation des composants
  templateUrl: './card-episode.component.html',
  styleUrls: ['./card-episode.component.css']
})
export class CardEpisodeComponent {
  @Input() imagePath: string = '';
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() profileImage: string = '';
  @Input() profileName: string = '';
  @Input() profileRole: string = '';
  // Compteurs pour chaque icône
  listensCount: string = '100k';  // Nombre de lectures
  likesCount: string = '2.5k';   // Nombre de likes
  commentsCount: string = '924k'; // Nombre de commentaires


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
