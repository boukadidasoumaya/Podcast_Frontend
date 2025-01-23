import { Component } from '@angular/core';
import { CardEpisodeComponent } from '../card-episode/card-episode.component';
import { LatestEpisodeCardComponent } from '../latest-episode-card/latest-episode-card.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { EpisodeHorizontalComponent } from "../episode-horizontal/episode-horizontal.component";
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-latest-episodes',
  standalone: true,
  imports: [LatestEpisodeCardComponent,RouterLink, CommonModule, EpisodeHorizontalComponent],
  templateUrl: './latest-episodes.component.html',
  styleUrl: './latest-episodes.component.css'
})
export class LatestEpisodesComponent {
  episodes = [
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
      displayedEpisodesCount =2; // Show 4 episodes initially

      // Method to get the currently displayed episodes
      episodesToShow() {
        return this.episodes.slice(0, this.displayedEpisodesCount);
      }
    
      // Method to load more episodes
      loadMoreEpisodes() {
        this.displayedEpisodesCount += 4; // Load 4 more episodes each time
      }
    
      // Example for checking if you're on the homepage
      isHomePage() {
        return true; // Replace with your actual condition
      }
    }