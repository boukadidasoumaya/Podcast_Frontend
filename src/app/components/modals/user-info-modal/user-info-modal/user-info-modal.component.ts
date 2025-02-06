import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, NgForm } from '@angular/forms';
import { UserService } from '../../../../services/user.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../../../store/auth/auth.actions';
import { UploadProgressComponent } from "../../../upload-progress/upload-progress.component";
import { CountryService } from '../../../../services/country.service';

@Component({
  selector: 'app-user-info-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, UploadProgressComponent],
  templateUrl: './user-info-modal.component.html',
  styleUrl: './user-info-modal.component.css'
})
export class UserInfoModalComponent implements OnInit {
  @Input() user: any = {};
  @Output() updatedUser = new EventEmitter<any>();
  @Output() onclose = new EventEmitter<void>();
  @Output() onsave = new EventEmitter<void>();

  formData: {
    firstName?: string;
    lastName?: string;
    birthday?: string;
    country?: string;
    profession?: string;
    photo?: string;
  } = {};

  updateForm!: FormGroup;
  isFileUploaded = { image: false };
  isUploading = { image: false };
  isUploadInProgress: boolean = false;
  countries: any[] = [];
  selectedCountry: string | undefined;

  constructor(
    private fb: FormBuilder,
    private countryService: CountryService,
    private userService: UserService,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit(): void {
    // Initialize formData with user's existing data
    this.formData = {
      firstName: this.user?.firstName || '',
      lastName: this.user?.lastName || '',
      birthday: this.user?.birthday ? this.formatDate(this.user.birthday) : '',
      country: this.user?.country || '',
      profession: this.user?.profession || '',
      photo: this.user?.photo
    };

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

  isFormValid(): boolean {
    return !this.isUploadInProgress;
  }

  onUserSubmit(userForm: NgForm): void {
    if (this.isUploadInProgress) {
      console.log('Waiting for upload to complete...');
      return;
    }

    if (userForm.valid) {
      this.userService.updateUserProfile(this.formData).subscribe({
        next: (response) => {
          this.store.dispatch(AuthActions.updateUser({ user: response }));
          console.log('User info updated successfully:', response);
        }
      });

      this.onsave.emit();
      this.onclose.emit();
    }
  }

  handleFileUploaded(fileUrl: string): void {
    this.isUploading.image = false;
    this.isFileUploaded.image = true;
    this.formData.photo = fileUrl;
  }

  handleFileRemoved(): void {
    this.formData.photo = this.user.photo;
    this.isFileUploaded.image = false;
    this.isUploading.image = false;
  }

  formatDate(dateString: string): string {
    if (!dateString) return '';
    return dateString.split('T')[0];
  }
}
