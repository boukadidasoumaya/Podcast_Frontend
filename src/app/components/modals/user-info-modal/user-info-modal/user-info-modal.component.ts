import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { UserService } from '../../../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-info-modal',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-info-modal.component.html',
  styleUrl: './user-info-modal.component.css'
})
export class UserInfoModalComponent {
  @Output() InfoUpdated = new EventEmitter<string>();
  
  formData = {
    username: '',
    birthday: '',
    country: ''
  };
  
 /* onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.updateUserPersonnalInfo.photo = file;
      console.log('Photo sélectionnée :', file);
    }
  }
*/
  constructor(private userService: UserService, private router: Router) {}  
  onUserSubmit(form: NgForm) {
    if (form.valid) {
      this.userService.updateUserProfile(this.formData)
        .subscribe({
          next: (response) => {
            console.log('info updated successfully:', response);
            // Call the parent's update function
          }
        });
    } else {
      console.error('Le formulaire est invalide.');
    }
  }
}
