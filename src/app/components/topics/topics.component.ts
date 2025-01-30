import { Component } from '@angular/core';
import { SwiperComponent } from "../swiper/swiper.component";
import { CommonModule } from '@angular/common';
import { Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DeleteButtonComponent } from '../shared/buttons/delete-button/delete-button.component';
@Component({
  selector: 'app-topics',
  standalone: true,
  imports: [ CommonModule,DeleteButtonComponent],
  templateUrl: './topics.component.html',
  styleUrl: './topics.component.css'
})
export class TopicsComponent {

  @Input() image: string = ''; // Input for image source
  @Input() title: string = ''; // Input for title
  @Input() customtext: string = ''; // Input for title
  @Input() episodes: number = 0; // Input for episodes (optional)
  @Input() podcastId: number=0;
@Input() episodeId: number=0;


onDelete() {
  console.log("Suppression en cours...");
  // Ajoute ici la logique de suppression
}


}
