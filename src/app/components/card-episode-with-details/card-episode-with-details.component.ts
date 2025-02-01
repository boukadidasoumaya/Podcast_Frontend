import { Component, Input, OnInit } from '@angular/core';
import { SubscribeButtonComponent } from '../shared/buttons/subscribe-button/subscribe-button.component';
import { RouterLink } from '@angular/router';
import { Episode, User } from '../../interfaces/app.interfaces';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EditEpisodeModalComponent } from '../modals/edit-episode-modal/edit-episode-modal.component';
import { UpdateModalComponent } from '../modals/update-modal/update-modal.component';
import { EpisodeService } from '../../services/episode.service';
import { CreateEpisode } from '../../models/podcast.model';
import { CreateModalComponent } from "../modals/create-modal/create-modal.component";

@Component({
  selector: 'app-card-episode-with-details',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, SubscribeButtonComponent, UpdateModalComponent, CreateModalComponent],
  templateUrl: './card-episode-with-details.component.html',
  styleUrl: './card-episode-with-details.component.css'
})
export class CardEpisodeWithDetailsComponent {
  @Input() episode!: Episode;
  @Input() episodeId!:number;
  @Input() currentUser!: Partial<User> ;
  isEditModalOpen: boolean = false;
  isAddModalOpen: boolean = false;

  constructor(private episodeService:EpisodeService) {

  }



  toggleEditModal() {
    this.isEditModalOpen = !this.isEditModalOpen;
  }
  toggleAddModal() {
    this.isAddModalOpen = !this.isAddModalOpen;
  }

  updateEpisode(updatedEpisode: Partial<Episode>) {
    this.episode = {
      ...this.episode,
      name: updatedEpisode.name ?? this.episode.name,
      description: updatedEpisode.description ?? this.episode.description,
      duration: updatedEpisode.duration ?? this.episode.duration,
      coverImage: updatedEpisode.coverImage ?? this.episode.coverImage,
      filepath: updatedEpisode.filepath ?? this.episode.filepath,
    };

    this.episodeService.updateEpisode(this.episode.id, updatedEpisode).subscribe(
      (response) => {
        this.episode = {
          ...this.episode,
          ...response
        };

        console.log("Épisode mis à jour avec succès", this.episode);
        this.toggleEditModal();
      },
      (error) => {
        console.error("Erreur lors de la mise à jour de l'épisode", error);
      }
    );
  }

  addEpisode(newEpisode: CreateEpisode) {
    newEpisode.podcast=this.episode.podcast;
    this.episodeService.createEpisode(newEpisode).subscribe(
      (response) => {
        console.log("Épisode ajouté avec succès", response);
        this.toggleAddModal();
      },
      (error) => {
        console.error("Erreur lors de l'ajout de l'épisode", error);
        console.log(newEpisode)
      }
    );
  }
  openEditModal(): void {
  this.toggleEditModal();
}
openAddModal():void{
  this.toggleAddModal();
}

  closeEditModal(): void {
    this.toggleEditModal();
  }
  closeAddModal(): void {
    this.toggleAddModal();
  }
}
