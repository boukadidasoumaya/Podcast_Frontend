import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-password-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './password-modal.component.html',
})
export class PasswordModalComponent {
  passwordData = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  };

  onPasswordUpdate(form: any) {
    if (form.valid) {
      console.log('Password update:', this.passwordData);
      // Ajoutez votre logique de mise à jour ici
    }
  }
}
