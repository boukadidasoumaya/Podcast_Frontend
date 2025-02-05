import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputFieldComponent } from '../input-field/input-field.component';
import { ActionButtonComponent } from '../action-button/action-button.component';
import { ToastrService } from 'ngx-toastr'; // Import Toastr

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, FormsModule, InputFieldComponent, ActionButtonComponent],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent {
  step: number = 1;
  email: string = '';
  verificationCode: string = '';
  newPassword: string = '';
  confirmPassword: string = '';

  constructor(private authService: AuthService, private toastr: ToastrService) {}

  sendVerificationCode() {
    if (this.email) {
      this.authService.forgotPassword(this.email).subscribe({
        next: (response) => {
          this.toastr.success(response.message, 'Succès');
          this.step=2;
        },
        error: (error) => {
          console.log(error);
          const errorMessage = error.error?.message || "Une erreur s'est produite";
          this.toastr.error(errorMessage, 'Erreur');
        }
      });

    } else {
      this.toastr.warning('Veuillez entrer une adresse e-mail valide', 'Attention');
    }
  }

  // Step 2: Verify the verification code
  verifyCode() {
    if (this.verificationCode) {
      this.authService.verifyResetCode(this.email, this.verificationCode).subscribe(
        (response) => {
          console.log('Code verified:', response);
          this.toastr.success('Code vérifié avec succès !', 'Succès');
          this.step = 3;
        },
        (error) => {
          this.toastr.error('Code invalide ou expiré. Réessayez.', 'Erreur');
        }
      );
    } else {
      this.toastr.warning('Veuillez entrer le code de vérification', 'Attention');
    }
  }

  // Step 3: Submit the new password
  submitPassword() {
    if (this.newPassword && this.confirmPassword) {
      if (this.newPassword === this.confirmPassword) {
        this.authService.resetPassword(this.email, this.newPassword, this.verificationCode).subscribe(
          (response) => {
            this.toastr.success('Mot de passe modifié avec succès !', 'Succès');
            window.location.href = '/login'; // Redirection
          },
          (error) => {
            this.toastr.error(error.error.message || 'Erreur lors de la réinitialisation', 'Erreur');
          }
        );
      } else {
        this.toastr.warning('Les mots de passe ne correspondent pas', 'Attention');
      }
    } else {
      this.toastr.warning('Veuillez entrer les deux mots de passe', 'Attention');
    }
  }
}
