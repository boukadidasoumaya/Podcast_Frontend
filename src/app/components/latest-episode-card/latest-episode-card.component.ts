import { Component, Input } from '@angular/core';
import { HeartIconComponent } from '../heart-icon/heart-icon.component';
import { CommentIconComponent } from '../comment-icon/comment-icon.component';
import { HeadphonesIconComponent } from '../headphones-icon/headphones-icon.component';

@Component({
  selector: 'app-latest-episode-card',
  standalone: true,
  imports: [HeartIconComponent, CommentIconComponent, HeadphonesIconComponent],
  templateUrl: './latest-episode-card.component.html',
  styleUrl: './latest-episode-card.component.css'
})
export class LatestEpisodeCardComponent {
    @Input() imagePath: string = '';
    @Input() title: string = '';
    @Input() description: string = '';
    @Input() profileImage: string = '';
    @Input() profileName: string = '';
    @Input() profileRole: string = '';
    views: number = 0;
    numberOfLikes: number = 0;
    numberOfComments: number = 0;


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
