import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormsModule, NgForm } from "@angular/forms";
import { UserService } from "../../../services/user.service";

@Component({
  selector: 'app-password-modal',
  standalone: true,
  imports: [CommonModule, FormsModule ],
  templateUrl: './password-modal.component.html',
})
export class PasswordModalComponent {
  passwordData = {
    oldPassword: '',  
    newPassword: '',
    confirmPassword: ''
  };

  constructor(private userService: UserService) {}  

  onPasswordUpdate(form: NgForm) {
    if (form.valid) {
      if (this.passwordData.newPassword !== this.passwordData.confirmPassword) {
        alert('New passwords do not match!');
        return;
      }

      const passwordUpdateData = {
        oldPassword: this.passwordData.oldPassword,
        newPassword: this.passwordData.newPassword
      };

      this.userService.updatePassword(passwordUpdateData).subscribe({
        next: (response) => {
          console.log('Password updated successfully:', response);
          this.passwordData = {
            oldPassword: '',
            newPassword: '',
            confirmPassword: ''
          };
          alert('Password updated successfully!');
        },
        error: (error) => {
          console.error('Error updating password:', error);
          alert(error.error.message || 'Error updating password');
        },
      });
    } else {
      alert('Please fill all required fields correctly');
    }
  }
}