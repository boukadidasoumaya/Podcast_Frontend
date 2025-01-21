import { Component } from '@angular/core';
import { CardEpisodeComponent } from '../card-episode/card-episode.component';
import { CommonModule } from '@angular/common';  // Importation nécessaire
import { SectionCustomComponent } from '../section-custom/section-custom.component';

@Component({
  selector: 'app-trending-episodes',
  standalone: true,
  imports: [CardEpisodeComponent, CommonModule,SectionCustomComponent],  // Ajoute CommonModule ici
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


}
