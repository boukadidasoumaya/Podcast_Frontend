import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-delete-confirmation-modal',
  standalone: true,
  templateUrl: './delete-confirmation-modal.component.html',
  styleUrls: ['./delete-confirmation-modal.component.css'],
})
export class DeleteConfirmationModalComponent {
  @Output() confirmDelete = new EventEmitter<void>();
  @Output() closeModal = new EventEmitter<void>();

  onConfirm() {
    this.confirmDelete.emit(); // Émet l'événement de confirmation
  }

  onCancel() {
    this.closeModal.emit(); // Émet l'événement pour fermer le modal
  }
}
