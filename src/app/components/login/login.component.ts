import { Component } from '@angular/core';
import { InputFieldComponent } from '../input-field/input-field.component';
import { ActionButtonComponent } from '../action-button/action-button.component';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [InputFieldComponent, ActionButtonComponent, CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  isSignIn: boolean = true;
  Data = {
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    birthday: '',
    country: '',
    profession: '',
    role: '',
    whatsappUser: '',
    instagramLink: '',
    password: '',
    confirmPassword: ''
  };
 
  isStepValid(step: number): boolean {
    switch (step) {
      case 1:
        return !!(this.Data.firstName && 
                 this.Data.lastName && 
                 this.Data.username && 
                 this.Data.email &&
                 this.isValidEmail(this.Data.email));
      case 2:
        return !!(this.Data.birthday && 
                 this.Data.country && 
                 this.Data.profession && 
                 this.Data.role);
      case 3:
        return !!(this.Data.password && 
                 this.Data.confirmPassword);
      default:
        return false;
    }
  }

  toggle(): void {
    this.isSignIn = !this.isSignIn;
    const container = document.getElementById('container');
    if (this.isSignIn) {
      container?.classList.add('sign-in');
      container?.classList.remove('sign-up');
    } else {
      container?.classList.add('sign-up');
      container?.classList.remove('sign-in');
    }
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  currentStep = 1;
  
  nextStep() {
    if (this.isStepValid(this.currentStep)) {
      if (this.currentStep < 3) {
        this.currentStep++;
      }
    }
  }

  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  constructor(private authService: AuthService, private router: Router) {}

  signUp(): void {
    this.authService.register(this.Data).subscribe({
      next: (response) => {
        this.router.navigate(['/']);
        console.log('Registration successful', response);
      },
      error: (error) => {
        console.error('Registration failed', error);
      },
    });
  }

  signIn() {
    this.authService.login(this.Data).subscribe({
      next: (response) => {
        console.log('Login successful', response);
  
        // Check for 'accessToken' instead of 'token'
        if (response.accessToken) {
          localStorage.setItem('authToken', response.accessToken);
  
          // Navigate to the home page
          this.router.navigate(['/home']); // Adjust route as needed
        } else {
          console.error('Token not found in the response.');
        }
      },
      error: (error) => {
        console.error('Login failed', error);
        // Optionally, display an error message to the user
      },
    });
  }
  
  
  onSubmit(form: NgForm) {
    if (form.valid) {
      console.log("firstname :",this.Data.firstName);
    }
  }
}
