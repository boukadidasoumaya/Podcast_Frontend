import { Component } from '@angular/core';
import { CardEpisodeComponent } from '../card-episode/card-episode.component';
import { LatestEpisodeCardComponent } from '../latest-episode-card/latest-episode-card.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-latest-episodes',
  standalone: true,
  imports: [LatestEpisodeCardComponent, CommonModule],
  templateUrl: './latest-episodes.component.html',
  styleUrl: './latest-episodes.component.css'
})
export class LatestEpisodesComponent {
  episodes = [
    {
    imagePath: 'assets/images/podcast/11683425_4790593.jpg',
    title: 'Modern Vintage',
    profileImage: 'assets/images/profile/woman-posing-black-dress-medium-shot.jpg',
    profileName: 'Elsa',
    profileRole: 'Influencer',
    description: 'Lorem Ipsum dolor sit amet consectetur'
  },
  {
    imagePath: 'assets/images/podcast/12577967_02.jpg',
    title: 'Daily Talk',
    profileImage: 'assets/images/profile/handsome-asian-man-listening-music-through-headphones.jpg',
    profileName: 'William',
    profileRole: 'Vlogger',
    description: 'Lorem Ipsum dolor sit amet consectetur'
    },
    {
      imagePath: 'assets/images/podcast/11683425_4790593.jpg',
      title: 'Modern Vintage',
      profileImage: 'assets/images/profile/woman-posing-black-dress-medium-shot.jpg',
      profileName: 'Elsa',
      profileRole: 'Influencer',
      description: 'Lorem Ipsum dolor sit amet consectetur'
    },
    {
      imagePath: 'assets/images/podcast/12577967_02.jpg',
      title: 'Daily Talk',
      profileImage: 'assets/images/profile/handsome-asian-man-listening-music-through-headphones.jpg',
      profileName: 'William',
      profileRole: 'Vlogger',
      description: 'Lorem Ipsum dolor sit amet consectetur'
      }
  ];

  constructor(private router: Router, private route: ActivatedRoute) {}

  episodesToShow() {
    if (this.isHomePage()) {
      return this.episodes.slice(0, 2); 
    }
    return this.episodes;
  }


  isHomePage() {
    return this.router.url === '/'; 
  }


  navigateToEpisodesPage() {
    this.router.navigate(['/latest-episodes']); 
  }
}
