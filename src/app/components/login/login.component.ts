import { Component } from '@angular/core';
import { InputFieldComponent } from '../input-field/input-field.component';
import { ActionButtonComponent } from '../action-button/action-button.component';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

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
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    birthday: '',
    country: '',
    job: '',
    role: '',
    whatsapp_user: '',
    instagram_user: '',
    password: '',
    confirmPassword: ''
  };

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

  currentStep = 1;
  
  nextStep() {
    if (this.currentStep < 3) {
      this.currentStep++;
    }
  }

  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  signUp(): void {
    console.log("firstname :",this.Data.firstname); 
  }
  onSubmit(form: NgForm) {
    if (form.valid) {
      console.log("firstname :",this.Data.firstname);
    }
  }
}
