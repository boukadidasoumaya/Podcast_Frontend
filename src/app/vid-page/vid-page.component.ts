import { Component } from '@angular/core';
import { SwiperComponent } from '../components/swiper/swiper.component';
import { TopicsComponent } from '../components/topics/topics.component';
import { SectionCustomComponent } from '../components/section-custom/section-custom.component';
import { VidPlayerComponent } from '../components/vid-player/vid-player.component';
import { CommentComponent } from '../components/comment/comment.component';
import { ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-vid-page',
  standalone: true,
  imports: [SwiperComponent,CommonModule,TopicsComponent,CommentComponent,SectionCustomComponent,VidPlayerComponent],
  templateUrl: './vid-page.component.html',
  styleUrl: './vid-page.component.css'
})
export class VidPageComponent {
    @ViewChild('player') playerElement!: ElementRef;
    
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
    
  
    
  podcastData = [
    {
      imageUrl: 'assets/images/podcast/27376480_7326766.jpg',
      title: 'Modern Vintage',
      episodeDuration: '50 Minutes',
      episodeNumber: 15,
      hostName: 'Elsa',
      hostImage: 'images/profile/woman-posing-black-dress-medium-shot.jpg',
      hostRole: 'Influencer',
      description: 'Lorem Ipsum dolor sit amet consectetur',
      stats: {
        headphones: 120,
        heart: 425,
        chat: 11,
        download: 50,
      },
    },
    {
      imageUrl: 'assets/images/podcast/27376480_7326766.jpg',
      title: 'Tech Talks',
      episodeDuration: '30 Minutes',
      episodeNumber: 8,
      hostName: 'John',
      hostImage: 'assets/images/podcast/27376480_7326766.jpg',
      hostRole: 'Tech Enthusiast',
      description: 'The lateszz /n t trends in technology.',
      stats: {
        headphones: 20,
        heart: 80,
        chat: 50,
        download: 70,
      },
    },{
      imageUrl: 'assets/images/podcast/27376480_7326766.jpg',
      title: 'Modern Vintage',
      episodeDuration: '50 Minutes',
      episodeNumber: 15,
      hostName: 'Elsa',
      hostImage: 'images/profile/woman-posing-black-dress-medium-shot.jpg',
      hostRole: 'Influencer',
      description: 'Lorem Ipsum dolor sit amet consectetur',
      stats: {
        headphones: 120000,
        heart: 42500,
        chat: 11000,
        download: 50000,
      },
    },
    {
      imageUrl: 'assets/images/podcast/27376480_7326766.jpg',
      title: 'Tech Talks',
      episodeDuration: '30 Minutes',
      episodeNumber: 8,
      hostName: 'John',
      hostImage: 'assets/images/podcast/27376480_7326766.jpg',
      hostRole: 'Tech Enthusiast',
      description: 'The latest trends in technology.',
      stats: {
        headphones: 200000,
        heart: 80000,
        chat: 5000,
        download: 70000,
      },
    },];
    // Add more items here
displayedTopics = [
 
  { 
    title: 'Mindfulness', 
    image: 'images/topics/woman-practicing-yoga-mat-home.jpg', 
    episodes: 35
  },
  { 
    title: 'Cooking', 
    image: 'images/topics/delicious-meal-with-sambal-arrangement.jpg', 
    episodes: 12 
  }, 
  { 
    title: 'Mindfulness', 
    image: 'images/topics/woman-practicing-yoga-mat-home.jpg', 
    episodes: 35
  },
  { 
    title: 'Cooking', 
    image: 'images/topics/delicious-meal-with-sambal-arrangement.jpg', 
    episodes: 12 
  }, 
  { 
    title: 'Mindfulness', 
    image: 'images/topics/woman-practicing-yoga-mat-home.jpg', 
    episodes: 35
  },
  { 
    title: 'Cooking', 
    image: 'images/topics/delicious-meal-with-sambal-arrangement.jpg', 
    episodes: 12 
  }, 
 
 
];



}
