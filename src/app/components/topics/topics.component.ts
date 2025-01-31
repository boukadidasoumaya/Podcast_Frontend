import { Component, EventEmitter, Output } from '@angular/core';
import { SwiperComponent } from "../swiper/swiper.component";
import { CommonModule } from '@angular/common';
import { Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DeleteButtonComponent } from '../shared/buttons/delete-button/delete-button.component';
import { User } from '../../interfaces/app.interfaces';
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
  @Input() customtext!: string; // Input for title
  @Input() subtitle!: string; // Input for episodes (optional)
  @Input() podcastId: number=0;
  @Input() episodeId!: number;
  @Input() isOwner!:boolean;
  @Output() delete = new EventEmitter<number>();

  onDelete() {
    console.log("Suppression en cours...", this.episodeId);
    console.log(this.isOwner)
    // this.delete.emit(this.episodeId);
  }


}
