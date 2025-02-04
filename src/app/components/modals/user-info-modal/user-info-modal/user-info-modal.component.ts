import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { UserService } from '../../../../services/user.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store'; 
import * as AuthActions from '../../../../store/auth/auth.actions'; 
import { CloudinaryService } from '../../../../services/cloudinary.service';

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
    firstName: '',
    lastName: '',
    birthday: '',
    country: '',
    photo: '',
  };
  constructor(private userService: UserService, private router: Router,private store: Store,private cloudinaryService: CloudinaryService ) {}  

  async onFileSelect(event: Event): Promise<void>  {
    const input = event.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    const file = input.files[0];
    if (file) {
      try {
        const photoUrl = await this.cloudinaryService.uploadToCloudinary(file);
        this.formData.photo = photoUrl;
        console.log('File uploaded successfully:', this.formData.photo );
      } catch (error) {
        console.error('Upload failed:', error);
      }    }
  }
  }
  onUserSubmit(form: NgForm) {
    if (form.valid) {
      this.userService.updateUserProfile(this.formData)
        .subscribe({
          next: (response) => {
            this.store.dispatch(AuthActions.updateUser({ user: response }));
            console.log('info updated successfully:', response);
          }
        });
    } else {
      console.error('Le formulaire est invalide.');
    }
  }
}
