import { Component } from '@angular/core';
import { CommentComponent } from '../comment/comment.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-details-podcast',
  standalone: true,
  imports: [CommonModule, CommentComponent],
  templateUrl: './details-podcast.component.html',
  styleUrl: './details-podcast.component.css'
})
export class DetailsPodcastComponent {
  episode = {
    imagePath: 'assets/images/podcast/11683425_4790593.jpg',
    title: 'Modern Vintage',
    description: 'What is Content Marketing? If you are wondering what content marketing is all about, this is the place to start.',
    profileImage: 'assets/images/profile/woman-posing-black-dress-medium-shot.jpg',
    profileName: 'Elsa',
    profileRole: 'Influencer',
    duration: '50 Minutes',
    episodeNumber: 15,
    socialLinks: {
      instagram: '#',
      twitter: '#',
      whatsapp: '#'
    }
  };
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
        user_image: "assets/images/profile/exemple.jpg",
        replies: [
          {
            id: 9,
            username: "Jane Doe",
            text: "Je suis d'accord !",
            created_at: "2024-01-19T11:00:00",
            user_image: "assets/images/profile/exemple.jpg"
          }]
      },
      {
        id: 5,
        username: "Jane Doe",
        text: "Je suis également d'accord !",
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
