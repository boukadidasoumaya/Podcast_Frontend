import { Component } from '@angular/core';
import { SwiperComponent } from "../swiper/swiper.component";
import { CommonModule } from '@angular/common';
import { Input } from '@angular/core';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-topics',
  standalone: true,
  imports: [ CommonModule, RouterLink],
  templateUrl: './topics.component.html',
  styleUrl: './topics.component.css'
})
export class TopicsComponent {
 
  @Input() image: string = ''; // Input for image source
  @Input() title: string = ''; // Input for title
  @Input() customtext: string = ''; // Input for title
  @Input() numbers: number = 0; // Input for episodes (optional)
  @Input() podcastId: number=0;
@Input() episodeId: number=0;

  


}
