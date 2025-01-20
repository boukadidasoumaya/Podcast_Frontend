import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-info-modal',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-info-modal.component.html',
  styleUrl: './user-info-modal.component.css'
})
export class UserInfoModalComponent {
  @Input() updateUserPersonnalInfo: any;
  
  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.updateUserPersonnalInfo.photo = file;
      console.log('Photo sélectionnée :', file);
    }
  }

  onUserSubmit(form: any): void {
    if (form.valid) {
      console.log('Données soumises :', this.updateUserPersonnalInfo);
      // Ajouter la logique pour traiter les données (ex : envoyer au backend)
    } else {
      console.error('Le formulaire est invalide.');
    }
  }
}
