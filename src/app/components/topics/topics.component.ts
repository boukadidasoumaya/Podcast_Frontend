import { Component, EventEmitter, Output } from '@angular/core';
import { SwiperComponent } from "../swiper/swiper.component";
import { CommonModule } from '@angular/common';
import { Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DeleteButtonComponent } from '../shared/buttons/delete-button/delete-button.component';
import { Podcast, User } from '../../interfaces/app.interfaces';
import { EditButtonComponent } from '../shared/buttons/edit-button/edit-button.component';
@Component({
  selector: 'app-topics',
  standalone: true,
  imports: [ CommonModule,DeleteButtonComponent,EditButtonComponent],
  templateUrl: './topics.component.html',
  styleUrl: './topics.component.css'
})
export class TopicsComponent {
  @Input() image: string = '';
  @Input() title: string = '';
  @Input() customtext!: string;
  @Input() subtitle!: string;
  @Input() isPodcast!:boolean;
  @Input() podcast!: Podcast;
  @Input() episodeId!: number;
  @Input() isOwner!:boolean;
  @Output() deletePodcast = new EventEmitter<Podcast>();
  @Output() deleteEpisode= new EventEmitter<number>();
  @Output() edit = new EventEmitter<Podcast>();
  @Output() checkDetails = new EventEmitter<Podcast>();

  onDelete() {
    if(this.isPodcast && this.isOwner){
      console.log("Suppression en cours podcast...", this.podcast);

      this.deletePodcast.emit(this.podcast);
    }
    else{
    console.log("Suppression en cours episode...", this.episodeId);
    console.log(this.isOwner)
    this.deleteEpisode.emit(this.episodeId);
    }
  }
  onEditClick() {
    if(this.isOwner && this.isPodcast){
      console.log("Bouton d'édition  podcast cliqué !",this.podcast);
      this.edit.emit(this.podcast);
    }
    else{
      console.log("Bouton d'édition cliqué !");
    }
  }
  onCheckDetailsClick() {
    this.checkDetails.emit(this.podcast);
    console.log("Check Details cliqué !");
  }

}
