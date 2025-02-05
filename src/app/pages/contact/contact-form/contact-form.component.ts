import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../../services/user.service'; // Assure-toi d'importer le service
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.css'
})
export class ContactFormComponent {

  // Modèle de données pour le formulaire
  contactData = {
    fullName: '',
    email: '',
    subject: '',
    content: ''
  };

  constructor(private userService: UserService) {}

  // Méthode appelée lors de la soumission du formulaire
  onSubmit() {
    // Envoi des données de contact au backend via le UserService
    this.userService.sendMailContact(this.contactData)
      .subscribe({
        next: (response) => {
          console.log('Message envoyé avec succès', response);
          this.contactData = {
            fullName: '',
            email: '',
            subject: '',
            content: ''
          };

        },
        error: (error) => {
          console.error('Erreur lors de l\'envoi du message', error);

        },
        complete: () => {
          console.log('Envoi du message terminé');

        }
      });
  }
}
