import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteConfirmationModalComponent } from '../../../modals/delete-confirmation-modal/delete-confirmation-modal.component';

@Component({
  selector: 'app-delete-button',
  standalone: true,
  imports: [CommonModule, DeleteConfirmationModalComponent],
  templateUrl: './delete-button.component.html',
  styleUrls: ['./delete-button.component.css']
})
export class DeleteButtonComponent {
  @Output() deleteConfirmed = new EventEmitter<boolean>();
  isModalOpen = false;

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  confirmDelete() {
    this.deleteConfirmed.emit(true); // Émet l'événement de suppression
    this.closeModal();
  }
}
