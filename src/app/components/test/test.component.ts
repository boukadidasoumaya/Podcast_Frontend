import { Component } from '@angular/core';
import { SwiperComponent } from '../swiper/swiper.component';
import { TopicsComponent } from '../topics/topics.component';
import { EpisodeHorizontalComponent } from '../episode-horizontal/episode-horizontal.component';
@Component({
  selector: 'app-test',
  standalone: true,
  imports: [SwiperComponent,TopicsComponent, EpisodeHorizontalComponent],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent {
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
      title: 'Productivity', 
      image: 'assets/images/podcast/27376480_7326766.jpg', 
      episodes: 50
    },
    { 
      title: 'Technician', 
      image: 'assets/images/podcast/27376480_7326766.jpg', 
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
      title: 'Productivity', 
      image: 'images/topics/physician-consulting-his-patient-clinic.jpg', 
      episodes: 50
    },
    { 
      title: 'Technician', 
      image: 'images/topics/repairman-doing-air-conditioner-service.jpg', 
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
    }
  ];
}
