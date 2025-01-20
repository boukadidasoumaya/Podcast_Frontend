import { Component } from '@angular/core';
import { CardEpisodeComponent } from '../card-episode/card-episode.component';
import { CommonModule } from '@angular/common';  // Importation nécessaire
import { CommentComponent } from '../comment/comment.component';

@Component({
  selector: 'app-trending-episodes',
  standalone: true,
  imports: [CardEpisodeComponent, CommonModule,CommentComponent],  // Ajoute CommonModule ici
  templateUrl: './trending-episodes.component.html',
  styleUrls: ['./trending-episodes.component.css']
})
export class TrendingEpisodesComponent {
  episodes = [
    {
      imagePath: 'assets/images/podcast/27376480_7326766.jpg',
      title: 'Vintage Show',
      description: 'Lorem Ipsum dolor sit amet consectetur',
      profileImage: 'assets/images/profile/woman-posing-black-dress-medium-shot.jpg',
      profileName: 'Elsa',
      profileRole: 'Influencer',
      listensCount: '120k',   // Nombre de lectures
      likesCount: '2.3k',     // Nombre de likes
      commentsCount: '500'    // Nombre de commentaires
    },
    {
      imagePath: 'assets/images/podcast/27670664_7369753.jpg',
      title: 'Vintage Show',
      description: 'Lorem Ipsum dolor sit amet consectetur',
      profileImage: 'assets/images/profile/cute-smiling-woman-outdoor-portrait.jpg',
      profileName: 'Taylor',
      profileRole: 'Creator',
      listensCount: '200k',
      likesCount: '5k',
      commentsCount: '2k'
    },
    {
      imagePath: 'assets/images/podcast/12577967_02.jpg',
      title: 'Daily Talk',
      description: 'Lorem Ipsum dolor sit amet consectetur',
      profileImage: 'assets/images/profile/handsome-asian-man-listening-music-through-headphones.jpg',
      profileName: 'William',
      profileRole: 'Vlogger',
      listensCount: '500k',
      likesCount: '15k',
      commentsCount: '10k'
    }
  ];
  // Exemple d'utilisation dans un autre composant
  commentData = [
    {
      id: 1,
      username: "John Doe",
      text: "C'est un super commentaire !",
      created_at: "2024-01-19T10:30:00",
      user_image: "assets/images/profile/exemple.jpg",
      replies: [
        {
          id: 2,
          username: "Jane Doe",
          text: "Je suis d'accord !",
          created_at: "2024-01-19T11:00:00",
          user_image: "assets/images/profile/exemple.jpg"
        }
      ]
    },
    {
      id: 3,
      username: "John Doe",
      text: "C'est un autre super commentaire !",
      created_at: "2024-01-19T10:30:00",
      user_image: "assets/images/profile/exemple.jpg",
      replies: [
        {
          id: 4,
          username: "Jane Doe",
          text: "Je suis également d'accord !",
          created_at: "2024-01-19T11:00:00",
          user_image: "assets/images/profile/exemple.jpg"
        }
      ]
    }
  ];


}
