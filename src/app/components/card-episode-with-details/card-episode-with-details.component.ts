import { Component, Input } from '@angular/core';
import { SubscribeButtonComponent } from '../subscribe-button/subscribe-button.component';

@Component({
  selector: 'app-card-episode-with-details',
  standalone: true,
  imports: [SubscribeButtonComponent],
  templateUrl: './card-episode-with-details.component.html',
  styleUrl: './card-episode-with-details.component.css'
})
export class CardEpisodeWithDetailsComponent {
  @Input() episode: any;
}
