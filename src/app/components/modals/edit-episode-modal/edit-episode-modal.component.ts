import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-episode-modal',
  standalone: true,
  imports:[CommonModule,FormsModule],
  templateUrl: './edit-episode-modal.component.html',
  styleUrl: './edit-episode-modal.component.css'
})
export class EditEpisodeModalComponent {
  @Input() episode: any = {};
  @Output() episodeUpdated = new EventEmitter<any>();
  @Output() closeModal = new EventEmitter<void>();

  saveChanges() {
    this.episodeUpdated.emit(this.episode);
    this.closeModal.emit();
  }
}
