// email-modal.component.ts
import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { UserService } from "../../../services/user.service";
import { Router } from '@angular/router';

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
  constructor(private userService: UserService, private router: Router) {}  
  onEmailUpdate(form: NgForm) {
    if (form.valid) {
      if (this.emailData.newEmail !== this.emailData.confirmEmail) {
        alert('New Emails do not match!');
        return;
      }

      const emailUpdateData = {
        oldEmail: this.emailData.currentEmail,
        newEmail: this.emailData.newEmail
      };

      this.userService.updateEmail(emailUpdateData).subscribe({
        next: (response) => {
          console.log('Email updated successfully:', response);
          alert('Email updated successfully!');
          this.router.navigate(['/profil']); 
        },
        error: (error) => {
          console.error('Error updating Email:', error);
          alert(error.error.message || 'Error updating Email');
        },
      });
    } else {
      alert('Please fill all required fields correctly');
    }
  }
}
