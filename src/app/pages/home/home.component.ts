import { Component } from '@angular/core';
import { SectionCustomComponent } from "../../components/section-custom/section-custom.component";
import { LatestEpisodesComponent } from "../../components/latest-episodes/latest-episodes.component";
import { SwiperComponent } from '../../components/swiper/swiper.component';
import { TopicsComponent } from '../../components/topics/topics.component';
import { TrendingEpisodesComponent } from "../../components/trending-episodes/trending-episodes.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { HeroSectionComponent } from "../../components/hero-section/hero-section.component";
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SectionCustomComponent, SwiperComponent, LatestEpisodesComponent, TopicsComponent, TrendingEpisodesComponent, FooterComponent, NavbarComponent, HeroSectionComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

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
