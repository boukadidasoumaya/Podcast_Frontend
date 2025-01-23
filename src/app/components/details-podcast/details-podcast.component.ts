import { Component } from '@angular/core';
import { CommentComponent } from '../comment/comment.component';
import { CommonModule } from '@angular/common';
import { SectionCustomComponent } from '../section-custom/section-custom.component';
import { SwiperComponent } from '../swiper/swiper.component';
import { TopicsComponent } from '../topics/topics.component';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-details-podcast',
  standalone: true,
  imports: [CommonModule, CommentComponent,SectionCustomComponent,SwiperComponent,TopicsComponent,NavbarComponent],
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
  displayedEpisodes = [
    {
      title: 'Episode 1',
      image: 'assets/images/podcast/11683425_4790593.jpg',
      episodes: 50
    },
    {
      title: 'Episode 2 ',
      image: 'assets/images/podcast/11683425_4790593.jpg',
      episodes: 12
    },
    {
      title: 'Episode 3',
      image: 'assets/images/podcast/11683425_4790593.jpg',
      episodes: 35
    },
    {
      title: 'Episode 4',
      image: 'assets/images/podcast/11683425_4790593.jpg',
      episodes: 35
    },
    {
      title: 'Episode 5',
      image: 'assets/images/podcast/11683425_4790593.jpg',
      episodes: 35
    },

  ];

commentData =[
  {
    id: 1,
    user: {
      id: 4,
      role: 'user',
      username: "John Doe",
      photo: "assets/images/profile/exemple.jpg",
    },
    text: "C'est un super commentaire !",
    created_at: "2024-01-19T10:30:00",
    replies: [
      {
        id: 2,
        user: {
          id: 5, // Ajoutez un ID utilisateur unique pour chaque utilisateur
          role: 'user',
          username: "Jane Doe",
          photo: "assets/images/profile/exemple.jpg",
        },
        text: "Je suis d'accord !",
        created_at: "2024-01-19T11:00:00",
        replies: [
          {
            id: 9,
            user: {
              id: 6, // Ajoutez un ID utilisateur unique pour chaque utilisateur
              role: 'user',
              username: "Jane Doe",
              photo: "assets/images/profile/exemple.jpg",
            },
            text: "Je suis d'accord !",
            created_at: "2024-01-19T11:00:00",
          },
        ],
      },
      {
        id: 5,
        user: {
          id: 7, // Ajoutez un ID utilisateur unique pour chaque utilisateur
          role: 'user',
          username: "Jane Doe",
          photo: "assets/images/profile/exemple.jpg",
        },
        text: "Je suis également d'accord !",
        created_at: "2024-01-19T11:00:00",
      },
    ],
  },
  {
    id: 3,
    user: {
      id: 8,
      role: 'user',
      username: "John Doe",
      photo: "assets/images/profile/exemple.jpg",
    },
    text: "C'est un autre super commentaire !",
    created_at: "2024-01-19T10:30:00",
    replies: [
      {
        id: 4,
        user: {
          id: 9, // Ajoutez un ID utilisateur unique pour chaque utilisateur
          role: 'user',
          username: "Jane Doe",
          photo: "assets/images/profile/exemple.jpg",
        },
        text: "Je suis également d'accord !",
        created_at: "2024-01-19T11:00:00",
      },
    ],
  },
];

}
