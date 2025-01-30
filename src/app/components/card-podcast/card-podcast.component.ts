import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-podcast',
  standalone: true,
  imports: [],
  templateUrl: './card-podcast.component.html',
  styleUrl: './card-podcast.component.css'
})
export class CardPodcastComponent {
  @Input() nbre_episodes: number = 0;
  @Input() podname: string = 'podcast1';
  @Input() username: string = 'dcfgvhjk';
  @Input() topic: string = 'creation';
  @Input() duration: number = 0;
  @Input() userimage: string = '../../../assets/images/profile/cute-smiling-woman-outdoor-portrait.jpg';
  @Input() podimage: string = '../../../assets/images/podcast/12577967_02.jpg';



}
