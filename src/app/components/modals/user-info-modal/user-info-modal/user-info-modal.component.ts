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
  imports: [CommonModule,FormsModule, UploadProgressComponent],
  templateUrl: './user-info-modal.component.html',
  styleUrl: './user-info-modal.component.css'
})
export class UserInfoModalComponent implements OnInit{
  @Input() user:any={}
  @Output() updatedUser=new EventEmitter<any>();
  @Output() onclose=new EventEmitter<void>();
  formData: {
    username?: string;
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

  constructor(private fb: FormBuilder,private countryService:CountryService) {}

  ngOnInit(): void {
    // Initialiser formData avec les infos de l'utilisateur passé en @Input()
    this.formData = {
      username: this.user?.username || '',
      birthday: this.user?.birthday ? this.formatDate(this.user.birthday) : '', 
      country: this.user?.country || '',
      profession: this.user?.profession || '',
      photo: this.user?.photo || ''
    };

    // Initialiser le formulaire avec les valeurs de formData
    this.updateForm = this.fb.group({
      username: [this.formData.username],
      birthday: [this.formData.birthday],
      country: [this.formData.country],
      profession: [this.formData.profession],
      photo: [this.formData.photo]
    });

    this.loadCountries();
    console.log("user from update", this.formData);
  }

  loadCountries(): void {
    this.countryService.getCountries().subscribe(
      (data: any[]) => {

        // Extraire les noms communs des pays
        this.countries = data.map(country => country.name.common);
        this.countries.sort();
        console.log('Countries loaded:', this.countries); // Vérifiez les données ici
      },
      (error) => {
        console.error('Erreur lors de la récupération des pays:', error);
      }
    );
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
    this.formData.photo = this.user.photo;
    this.isFileUploaded.image = false;
    this.isUploading.image = false;
  }

  resetForm(): void {
    this.isFileUploaded = { image: false };
    this.isUploading = { image: false };
    this.formData = { username: '', birthday: '', country: '',profession:'', photo: '' };
    this.updateForm.reset(this.formData);
  }
  formatDate(dateString: string): string {
    if (!dateString) return '';
    return dateString.split('T')[0];
  }

}
