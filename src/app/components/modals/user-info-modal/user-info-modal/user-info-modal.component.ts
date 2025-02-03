import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, NgForm } from '@angular/forms';
import { UserService } from '../../../../services/user.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../../../store/auth/auth.actions';
import { CloudinaryService } from '../../../../services/cloudinary.service';
import { UploadProgressComponent } from "../../../upload-progress/upload-progress.component";
import { CountryService } from '../../../../services/country.service';

@Component({
  selector: 'app-user-info-modal',
  standalone: true,
  imports: [FormsModule, UploadProgressComponent],
  templateUrl: './user-info-modal.component.html',
  styleUrl: './user-info-modal.component.css'
})
export class UserInfoModalComponent implements OnInit{
  @Input() user:any={}
  @Output() updatedUser=new EventEmitter<any>();
  @Output() onclose=new EventEmitter<void>();
  formData = {
    username: this.user.username,
    birthday: this.user.birthDate,
    country: this.user.country,
    photo: null as string | null,
  };


  updateForm!: FormGroup;
  isFileUploaded = { image: false };
  isUploading = { image: false };
  isUploadInProgress: boolean = false;
  countries: any[] = [];

  constructor(private fb: FormBuilder,private countryService:CountryService) {}

  ngOnInit(): void {
    this.updateForm = this.fb.group({
      username: [this.formData.username],
      birthday: [this.formData.birthday],
      country: [this.formData.country],
      photo: [this.formData.photo],
    });

    this.countryService.getCountries().subscribe((data) => {
      this.countries = data.map(country => country.name.common); // Extract country names
    });
    console.log("countries",this.countries);
  }

  // Listen to upload status changes
  handleUploadStatusChanged(isUploading: boolean): void {
    this.isUploadInProgress = isUploading;
  }

  isFormValid(): boolean {
    return this.updateForm.valid && !this.isUploadInProgress; // Disable save if upload is in progress
  }

  onUserSubmit(userForm: any): void {
    if (this.isUploadInProgress) {
      console.log('En attente de l\'upload...');
      return;
    }

    if (userForm.valid) {
      const formDataToSave = { ...userForm.value, photo: this.formData.photo };
      this.saveUserData(formDataToSave);
    }
  }

  saveUserData(userData: any): void {
    console.log('User data saved:', userData);
    this.updatedUser.emit(userData);
    this.onclose.emit();
    this.resetForm();
    this.closeModal();
  }

  closeModal(): void {
    console.log('Modal closed');
  }

  handleFileUploaded(fileUrl: string): void {
    this.isUploading.image = false; // Mark upload as finished
    this.isFileUploaded.image = true;
    this.formData.photo = fileUrl; // Store the uploaded file URL

    if (!this.isUploading.image && this.updateForm.valid) {
      this.updateForm.markAsPristine();
    }
  }

  handleFileUploading(): void {
    this.isUploading.image = true;
    this.updateForm.setErrors({ uploadInProgress: true });
  }

  handleFileRemoved(): void {
    this.formData.photo = null;
    this.isFileUploaded.image = false;
    this.isUploading.image = false;
  }

  resetForm(): void {
    this.isFileUploaded = { image: false };
    this.isUploading = { image: false };
    this.formData = { username: '', birthday: '', country: '', photo: null };
    this.updateForm.reset(this.formData);
  }
}
