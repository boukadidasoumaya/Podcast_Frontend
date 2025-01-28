import { Component } from '@angular/core';
import { TrendingEpisodesComponent } from '../trending-episodes/trending-episodes.component';
import { CardEpisodeComponent } from '../card-episode/card-episode.component';
import { CommonModule } from '@angular/common';
import { SearchComponent } from '../navbar/search/search.component';
import { FiltreComponent } from '../filtre/filtre.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { NgArrayPipesModule } from 'ngx-pipes';
import { CardPodcastComponent } from '../card-podcast/card-podcast.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-pages',
  standalone: true,
  imports: [TrendingEpisodesComponent,CardEpisodeComponent, CommonModule,SearchComponent,FiltreComponent,NavbarComponent,NgArrayPipesModule,CardPodcastComponent,HttpClientModule],
  templateUrl: './pages.component.html',
  styleUrl: './pages.component.css'
})
export class PagesComponent {

  podcasts=[{
    imagePath: 'assets/images/podcast/27376480_7326766.jpg',
    title: 'Vintage Show',
    description: 'Lorem Ipsum dolor sit amet consectetur',
    profileImage: 'assets/images/profile/woman-posing-black-dress-medium-shot.jpg',
    profileName: 'Elsa',
    profileRole: 'Influencer',
    listensCount: '120k',
    likesCount: '2.3k',
    commentsCount: '500'
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
  }];

}
