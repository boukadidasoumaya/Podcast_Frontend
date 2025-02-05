import { Component } from '@angular/core';
import { InputFieldComponent } from '../input-field/input-field.component';
import { ActionButtonComponent } from '../action-button/action-button.component';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { catchError, from, Observable, of, switchMap } from 'rxjs';
import { CloudinaryService } from '../../services/cloudinary.service';
import { Store } from '@ngrx/store';
import { login } from '../../store/auth/auth.actions';
import { register } from '../../store/auth/auth.actions';
import { selectAuthError } from '../../store/auth/auth.selectors';
import { AppState } from '../../store/auth/app.state';
import { CountryService } from '../../services/country.service';
import { UploadProgressComponent } from "../upload-progress/upload-progress.component";
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [InputFieldComponent, ActionButtonComponent, CommonModule, FormsModule, UploadProgressComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  isSignIn: boolean = true;
  usernameTaken: boolean = false;
  emailTaken: boolean = false;
  emailFormat : boolean =true;
  stepValid : boolean =true;
  PasswordValid: boolean = true;
  error$: Observable<string | null>;
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
    countries: any[] = [];
    isFileUploaded = { image: false };
    isUploading = { image: false };
    isUploadInProgress: boolean = false;

    constructor(
      private http: HttpClient,
      private authService: AuthService,
      private router: Router,
      private cloudinaryService: CloudinaryService,
      private countryService: CountryService,

      private store: Store<AppState>
    ) {
      this.error$ = this.store.select(selectAuthError);

    }
    ngOnInit() {
      this.loadInterests();
      this.loadCountries();
    }
    loadCountries(): void {
      this.countryService.getCountries().subscribe(
        (data: any[]) => {
          this.countries = data.map(country => country.name.common);
          this.countries.sort();
          console.log('Countries loaded:', this.countries);
        },
        (error) => {
          console.error('Error fetching countries:', error);
        }
      );
    }
    handleUploadStatusChanged(isUploading: boolean): void {
    this.isUploadInProgress = isUploading;
    }

    isStepValid(step: number): boolean {
      switch (step) {
        case 1:
          this.stepValid = !!(this.Data.firstName &&
                              this.Data.lastName &&
                              this.Data.username &&
                              this.Data.email &&
                              !this.usernameTaken &&
                              !this.emailTaken &&
                              this.Data.birthday &&
                              this.emailFormat &&
                              !this.isUploadInProgress
                            );
          break;
        case 2:
          this.stepValid = !!(this.Data.country &&
                              this.Data.profession);
          break;
        case 3:
          this.stepValid = !!(this.Data.password &&
                              this.Data.confirmPassword &&
                              this.PasswordValid);
          break;
        default:
          this.stepValid = false;
      }

      return this.stepValid;
    }

  toggle(): void {
    this.isSignIn = !this.isSignIn;
    this.resetData();
    const container = document.getElementById('container');
    if (this.isSignIn) {
      container?.classList.add('sign-in');
      container?.classList.remove('sign-up');
    } else {
      container?.classList.add('sign-up');
      container?.classList.remove('sign-in');
    }
  }

  isValidEmail(email: string) {
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      this.emailFormat=emailRegex.test(email);
  }

  currentStep = 1;

  nextStep() {
    console.log("1",this.isStepValid(this.currentStep));
    console.log("2",this.stepValid);

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

  triggerFileInput() {
    const fileInput = document.getElementById('photo') as HTMLInputElement;
    fileInput.click(); // Programmatically click the hidden file input
  }


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
  handleFileUploaded(fileUrl: string): void {
    this.isUploading.image = false;
    this.isFileUploaded.image = true;
    this.Data.photo = fileUrl;
  }

  handleFileRemoved(): void {
    this.Data.photo = null;
    this.isFileUploaded.image = false;
    this.isUploading.image = false;
  }
  checkUsername(): void {
    this.usernameTaken=false;
    if (this.Data.username) {
        this.authService.checkUsernameUnique(this.Data.username)
            .pipe(
                catchError((err) => {
                    return of(false);
                })
            )
            .subscribe({
                next: (isTaken) => {
                    this.usernameTaken = isTaken;
                }
            });
    }
}

  checkEmail(): void {
    this.emailFormat=true;
    this.emailTaken=false;
    if (this.Data.email) {
      this.isValidEmail(this.Data.email);
      this.authService.checkEmailUnique(this.Data.email)
          .pipe(
              catchError((err) => {
                  console.error('Error checking username:', err);
                  return of(false);
              })
          )
          .subscribe({
              next: (isTaken) => {
                  this.emailTaken = isTaken;
                  console.log("email",isTaken)
              }
          });
    }
  }

  checkEmailinLogin(){
    if(this.Data.email){
    this.isValidEmail(this.Data.email);
  }
  }
  signUp(): void {
    this.store.dispatch(register({ userData: this.Data }));
    this.currentStep++;
    this.resetData();
    this.toggle();
  }

  signIn() {
    this.store.dispatch(login({ userData :this.Data }));
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

  passwordmatch(){
    if( this.Data.password != this.Data.confirmPassword)
      {
         this.PasswordValid=false;
      }
      else{
        this.PasswordValid=true;
      }
    }



    resetData(): void {
      this.Data = {
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        birthday: '',
        country: '',
        profession: '',
        whatsappUser: '',
        role: '',
        instagramLink: '',
        twitterUser: '',
        password: '',
        confirmPassword: '',
        photo: null,
        interests: []
      };
 }

}
