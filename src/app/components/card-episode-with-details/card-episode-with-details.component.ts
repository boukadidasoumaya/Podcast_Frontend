import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-card-episode-with-details',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './card-episode-with-details.component.html',
  styleUrl: './card-episode-with-details.component.css'
})
export class CardEpisodeWithDetailsComponent {
  @Input() episode: any;
}
