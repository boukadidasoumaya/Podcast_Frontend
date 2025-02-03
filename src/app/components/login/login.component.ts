import { Component } from '@angular/core';
import { InputFieldComponent } from '../input-field/input-field.component';
import { ActionButtonComponent } from '../action-button/action-button.component';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { catchError, from, of, switchMap } from 'rxjs';
import { CloudinaryService } from '../../services/cloudinary.service';
import { Store } from '@ngrx/store';
import { login } from '../../store/auth/auth.actions';
import { register } from '../../store/auth/auth.actions';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [InputFieldComponent, ActionButtonComponent, CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  isSignIn: boolean = true;
  usernameTaken: boolean = false;
  validation={
    firstName:true,
    lastName: true,
    username: true,
    email: true,
    birthday: true,
    country: true,
    profession: true,
    password: true,
    confirmPassword: true
  }
  Data = {
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    birthday: '',
    country: '',
    profession: '',
    whatsappUser: '',
    role:'',
    instagramLink: '',
    twitterUser:'',
    password: '',
    confirmPassword: '',
    photo: null as string | null,
    interests: [] as string[]
    };

    interestsList: string[] = [];

    isStepValid(step: number): boolean {
    switch (step) {
      case 1:
        return !!(this.Data.firstName && 
                 this.Data.lastName && 
                 this.Data.username &&
                 this.Data.email &&
                 !this.usernameTaken &&
                 this.Data.birthday && 
                 this.isValidEmail(this.Data.email));
      case 2:
        return !!(this.Data.country && 
                 this.Data.profession);
      case 3:
        return !!(this.Data.password &&
                 this.Data.confirmPassword&&
                 this.Data.password === this.Data.confirmPassword
                );
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
      if (this.currentStep < 4) {
        this.currentStep++;
      }
    }
  }

  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router,
    private cloudinaryService: CloudinaryService,
    private store: Store
  ) {}

  async onFileSelect(event: Event): Promise<void>  {
    const input = event.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    const file = input.files[0];
    if (file) {
      try {
        const photoUrl = await this.cloudinaryService.uploadToCloudinary(file);
        this.Data.photo = photoUrl;
        console.log('File uploaded successfully:', this.Data.photo );
      } catch (error) {
        console.error('Upload failed:', error);
      }    }
  }
  }

  checkUsername(): void {
    this.usernameTaken=false;
    if(!this.Data.username || this.Data.username.trim().length <4)
      {
        this.validation.username=false;
      }
      else{
        this.validation.username=true;
      }
    if (this.Data.username) { 
        console.log(this.Data.username);
        this.authService.checkUsernameUnique(this.Data.username)
            .pipe(
                catchError((err) => {
                    console.error('Error checking username:', err);
                    return of(false); 
                })
            )
            .subscribe({
                next: (isTaken) => {
                    this.usernameTaken = isTaken; 
                    console.log(this.usernameTaken)
                }
            });
    }
}

  signUp(): void {
    this.store.dispatch(register({ userData: this.Data }));
    this.currentStep++;
    
  }

  signIn() {
    this.store.dispatch(login({ userData :this.Data }));
  }

  ngOnInit() {
    this.loadInterests();
  }

  loadInterests() {
    this.http.get<string[]>('http://localhost:3000/auth/interests').subscribe({
      next: (data) => {
        this.interestsList = data;
      },
      error: (err) => {
        console.error('Failed to load interests:', err);
      }
    });
  }

  isInterestSelected(interest: string): boolean {
    return this.Data.interests.includes(interest);
  }

  toggleInterest(interest: string): void {
    const index = this.Data.interests.indexOf(interest);
    if (index === -1) {
        this.Data.interests.push(interest);
    } else {
        this.Data.interests.splice(index, 1);
    }
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      console.log("firstname :",this.Data.firstName);
    }
  }

  validateFirstName(){
    if(!this.Data.firstName || this.Data.firstName.trim().length <4)
    {
      this.validation.firstName=false;
    }
    else{
      this.validation.firstName=true;
    }
  }

  validateLastName(){
    if(!this.Data.lastName || this.Data.lastName.trim().length <4)
    {
      this.validation.lastName=false;
    }
    else{
      this.validation.lastName=true;
    }
  }
  validateProfession(){
    if(!this.Data.profession || this.Data.profession.trim().length <4)
    {
      this.validation.profession=false;
    }
    else{
      this.validation.profession=true;
    }
  }
  validateCountry(){
    if(!this.Data.country || this.Data.profession.trim().length <4)
    {
      this.validation.country=false;
    }
    else{
      this.validation.country=true;
    }
  }
  validateEmail(){
    if(!this.isValidEmail(this.Data.email))
    {
      this.validation.email=false;
    }
    else{
      this.validation.email=true;
    }
  }

  validatePwd(){
    if(!this.Data.password || this.Data.password.trim().length <4)
    {
      this.validation.password=false;
    }
    else{
      this.validation.password=true;
    }
  }

  validateConPwd(){
    if(this.Data.password != this.Data.confirmPassword)
      {
        this.validation.confirmPassword=false;
      }
      else{
        this.validation.confirmPassword=true;
      }
  }
  
  
}