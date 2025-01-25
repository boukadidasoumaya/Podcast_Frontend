import { Component } from '@angular/core';
import { SectionCustomComponent } from "../components/section-custom/section-custom.component";
import { LatestEpisodesComponent } from "../components/latest-episodes/latest-episodes.component";
import { SwiperComponent } from '../components/swiper/swiper.component';
import { TopicsComponent } from '../components/topics/topics.component';
import { TrendingEpisodesComponent } from "../components/trending-episodes/trending-episodes.component";
import { FooterComponent } from "../components/footer/footer.component";
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SectionCustomComponent, SwiperComponent, LatestEpisodesComponent, TopicsComponent, TrendingEpisodesComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {podcastData = [
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
podcasters = [
  {
    name: 'Taylor',
    imageUrl: 'images/profile/cute-smiling-woman-outdoor-portrait.jpg',
    badges: ['Modeling', 'Fashion'],
    socialLinks: {
      twitter: 'https://twitter.com/taylor',
      facebook: 'https://facebook.com/taylor',
      pinterest: 'https://pinterest.com/taylor'
    }
  },
  {
    name: 'Jordan',
    imageUrl: 'images/profile/jordan-profile.jpg',
    badges: ['Podcasting', 'Tech'],
    socialLinks: {
      twitter: 'https://twitter.com/jordan',
      facebook: 'https://facebook.com/jordan',
      pinterest: 'https://pinterest.com/jordan'
    }
  },
  {
    name: 'Alex',
    imageUrl: 'images/profile/alex-profile.jpg',
    badges: ['Photography', 'Travel'],
    socialLinks: {
      twitter: 'https://twitter.com/alex',
      facebook: 'https://facebook.com/alex',
      pinterest: 'https://pinterest.com/alex'
    }
  }
];
}
