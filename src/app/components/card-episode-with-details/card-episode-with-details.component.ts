import { Component, Input, OnInit } from '@angular/core';
import { SubscribeButtonComponent } from '../shared/buttons/subscribe-button/subscribe-button.component';
import { RouterLink } from '@angular/router';
import { Episode, User } from '../../interfaces/app.interfaces';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EditEpisodeModalComponent } from '../modals/edit-episode-modal/edit-episode-modal.component';
import { UpdateModalComponent } from '../modals/update-modal/update-modal.component';

@Component({
  selector: 'app-card-episode-with-details',
  standalone: true,
  imports: [CommonModule, RouterLink,FormsModule,SubscribeButtonComponent,UpdateModalComponent],
  templateUrl: './card-episode-with-details.component.html',
  styleUrl: './card-episode-with-details.component.css'
})
export class CardEpisodeWithDetailsComponent implements OnInit {
  @Input() episode!: Episode;
  user: Partial<User> | null = null;
  isEditModalOpen: boolean = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe(
      (user) => {
        this.user = user;
      },
      () => {
        this.user = null;
      }
    );
  }

  toggleEditModal() {
    this.isEditModalOpen = !this.isEditModalOpen;
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

    console.log("updated episode", this.episode);
    this.toggleEditModal();
  }
  openEditModal(): void {
  this.toggleEditModal();
}

  closeEditModal(): void {
    this.toggleEditModal();
  }
}
