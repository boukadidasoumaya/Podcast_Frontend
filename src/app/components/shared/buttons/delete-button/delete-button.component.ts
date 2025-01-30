import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-delete-button',
  standalone: true,
  imports:[CommonModule],
  templateUrl: './delete-button.component.html',
  styleUrls: ['./delete-button.component.css']
})
export class DeleteButtonComponent {
  @Output() deleteConfirmed = new EventEmitter<void>();
  isModalOpen = false;

  openModal() {
    this.isModalOpen = true; // Ouvre le modal
  }

  closeModal() {
    this.isModalOpen = false; // Ferme le modal
  }

  confirmDelete() {
    this.deleteConfirmed.emit(); // Émet un événement pour confirmer la suppression
    this.closeModal(); // Ferme le modal
  }
}
