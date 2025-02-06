import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { UploadProgressComponent } from '../../upload-progress/upload-progress.component';
import { Podcast } from '../../../interfaces/app.interfaces';

@Component({
  selector: 'app-update-podcast-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, UploadProgressComponent],
  templateUrl: './update-podcast-modal.component.html',
  styleUrls: ['./update-podcast-modal.component.css'],
})
export class UpdatePodcastModalComponent implements OnInit {
  @Input() podcastData!: Partial<Podcast>;
  @Output() onSave = new EventEmitter<Partial<Podcast>>();
  @Output() onClose = new EventEmitter<void>();

  updateForm!: FormGroup;
  isFileUploaded = { image: false };
  isUploading = { image: false };
  isUploadInProgress: boolean = false;  

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.updateForm = this.fb.group({
      name: [this.podcastData?.name, Validators.required],
      description: [this.podcastData?.description, Validators.required],
      image: [this.podcastData?.image],
    });
  }

  // Listen to upload status changes
  handleUploadStatusChanged(isUploading: boolean): void {
    this.isUploadInProgress = isUploading;
  }

  isFormValid(): boolean {
    return this.updateForm.valid && !this.isUploadInProgress; // Disable save if upload is in progress
  }

  saveChanges(): void {
    if (this.isUploadInProgress) {
      console.log('En attente de l\'upload...');
      return;
    }

    // Si le formulaire est valide, on émet l'événement de sauvegarde
    if (this.updateForm.valid) {
      this.onSave.emit(this.updateForm.value);
      this.onClose.emit();
      this.closeModal();
    }
  }

  closeModal(): void {
    this.onClose.emit();
    this.resetFileUploads();
    this.updateForm.reset({
      name: this.podcastData?.name || '',
      description: this.podcastData?.description || '',
      image: this.podcastData?.image || null,
    });
  }

  handleFileUploaded(fileUrl: string): void {
    // Fichier téléchargé avec succès
    this.isUploading.image = false; // Marque l'upload comme terminé
    this.isFileUploaded.image = true;
    this.updateForm.patchValue({ image: fileUrl });

    // Vérifie si tous les fichiers sont téléchargés et si le formulaire est valide
    if (!this.isUploading.image && this.updateForm.valid) {
      this.updateForm.markAsPristine(); // Réinitialise l'état du formulaire si nécessaire
    }
  }

  handleFileUploading(): void {
    // Marque le fichier comme étant en cours de téléchargement
    this.isUploading.image = true;

    // Désactive la validité du formulaire pendant l'upload
    this.updateForm.setErrors({ uploadInProgress: true });
  }

  handleFileRemoved(): void {
    this.updateForm.patchValue({ image: null });
    this.isFileUploaded.image = false;
    this.isUploading.image = false;
  }

  resetFileUploads(): void {
    this.isFileUploaded = { image: false };
    this.isUploading = { image: false };

    // Restore the initial value of image
    this.updateForm.patchValue({ image: this.podcastData?.image || null });
    this.updateForm.setErrors(null); // Reset form errors if necessary
  }
}
