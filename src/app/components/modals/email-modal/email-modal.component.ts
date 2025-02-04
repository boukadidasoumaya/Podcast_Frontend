// email-modal.component.ts
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { UserService } from "../../../services/user.service";
import { Router } from '@angular/router';
import { Store } from '@ngrx/store'; 
import * as AuthActions from '../../../store/auth/auth.actions'; 

declare var bootstrap: any;
@Component({
  selector: 'app-email-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './email-modal.component.html',
})
export class EmailModalComponent {
  @Output() emailUpdated = new EventEmitter<string>();
  @Input() currentUserEmail: string = '';
  @ViewChild('emailModal') emailModal!: ElementRef;
  emailData = {
    currentEmail: '',
    newEmail: '',
    confirmEmail: ''
  };
  
  ngOnInit() {
    this.emailData.currentEmail = this.currentUserEmail;
  }

  constructor(private userService: UserService, private router: Router,private store: Store) {}  
  onEmailUpdate(form: NgForm) {
    if (form.valid) {
      if (this.emailData.newEmail !== this.emailData.confirmEmail) {
        alert('New Emails do not match!');
        return;
      }
  
      const emailUpdateData = {
        oldEmail: this.emailData.currentEmail,
        newEmail: this.emailData.newEmail,
      };
  
      this.userService.updateEmail(emailUpdateData)
        .subscribe({
          next: (response) => {
            localStorage.removeItem('authToken');

            this.userService.updateToken(emailUpdateData.newEmail)
              .subscribe({
                next: (response) => {
                  if (response.accessToken) {
                    localStorage.setItem('authToken', response.accessToken);

                    this.store.dispatch(AuthActions.updateEmail({ newEmail: emailUpdateData.newEmail }));

                    this.router.navigate(['/profil']);
                  } else {
                    console.error('Token not found in the response.');
                  }
                },
                error: (error) => {
                  console.error('Error updating token:', error);
                }
              });
          },
          error: (error) => {
            console.error('Error during update process:', error);
          }
        });
    } else {
      alert('Please fill all required fields correctly');
    }
  }
  
}
