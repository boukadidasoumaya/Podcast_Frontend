import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-social-media-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './social-media-modal.component.html',
})
export class SocialMediaModalComponent {
  socialMediaData = {
    whatsapp: '',
    instagram: '',
    twitter: ''
  };

  onSocialMediaUpdate(form: any) {
    if (form.valid) {
      console.log('Social media update:', this.socialMediaData);
      // Ajoutez votre logique de mise à jour ici
    }
  }
}
