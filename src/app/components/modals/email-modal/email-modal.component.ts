// email-modal.component.ts
import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-email-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './email-modal.component.html',
})
export class EmailModalComponent {
  @Output() emailUpdated = new EventEmitter<string>();
  emailData = {
    currentEmail: '',
    newEmail: '',
    confirmEmail: ''
  };

  onEmailUpdate(form: any) {
    if (form.valid) {
      console.log('Email update:', this.emailData);
      this.emailUpdated.emit(this.emailData.newEmail);
      // Ajoutez votre logique de mise à jour ici
    }
  }
}
