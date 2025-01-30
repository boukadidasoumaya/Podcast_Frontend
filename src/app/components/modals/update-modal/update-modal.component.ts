import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { UploadProgressComponent } from '../../upload-progress/upload-progress.component';
import { Episode, Podcast } from '../../../interfaces/app.interfaces';

@Component({
  selector: 'app-update-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, UploadProgressComponent],
  templateUrl: './update-modal.component.html',
  styleUrls: ['./update-modal.component.css'],
})
export class UpdateModalComponent implements OnInit {
  @Input() type: 'podcast' | 'episode' = 'podcast';
  @Input() entityData!: this['type'] extends 'podcast' ? Partial<Podcast> : Partial<Episode>;
  @Output() onSave = new EventEmitter<any>();
  @Output() onClose = new EventEmitter<void>();

  updateForm!: FormGroup;
  isFileUploaded = { coverImage: false, filepath: false }; // Suivi du statut de téléchargement des fichiers
  isUploading = { coverImage: false, filepath: false };  // Suivi des fichiers en cours de téléchargement
  isUploadInProgress: boolean = false;  // Track the overall upload status

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.updateForm = this.fb.group({
      name: [this.entityData?.name, Validators.required],
      description: [this.entityData?.description, Validators.required],
      duration: [this.entityData?.duration, [Validators.required, Validators.min(0)]],
      filepath: [this.type === 'episode' && (this.entityData as Episode)?.filepath || null],
      coverImage: [this.type === 'podcast' && (this.entityData as Podcast)?.image || (this.entityData as Episode)?.coverImage],
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
    // Si un fichier est en cours de téléchargement, on bloque l'envoi
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
      name: this.entityData?.name || '',
      description: this.entityData?.description || '',
      duration: this.entityData?.duration || null,
      filepath: this.type === 'episode' ? (this.entityData as Episode)?.filepath : null,
      coverImage: this.type === 'podcast' ? (this.entityData as Podcast)?.image : (this.entityData as Episode)?.coverImage,
    });
  }

  handleFileUploaded(fileUrl: string, field: 'coverImage' | 'filepath'): void {
    // Fichier téléchargé avec succès
    this.isUploading[field] = false; // Marque l'upload comme terminé
    this.isFileUploaded[field] = true;
    this.updateForm.patchValue({ [field]: fileUrl });

    // Vérifie si tous les fichiers sont téléchargés et si le formulaire est valide
    if (!this.isUploading.coverImage && !this.isUploading.filepath && this.updateForm.valid) {
      this.updateForm.markAsPristine(); // Réinitialise l'état du formulaire si nécessaire
    }
  }

  handleFileUploading(field: 'coverImage' | 'filepath'): void {
    // Marque le fichier comme étant en cours de téléchargement
    this.isUploading[field] = true;

    // Désactive la validité du formulaire pendant l'upload
    this.updateForm.setErrors({ uploadInProgress: true });
  }

  handleFileRemoved(field: 'coverImage' | 'filepath'): void {
    this.updateForm.patchValue({ [field]: null });
    this.isFileUploaded[field] = false;
    this.isUploading[field] = false;  // Réinitialisation de l'état de téléchargement
  }

  resetFileUploads(): void {
    this.isFileUploaded = { coverImage: false, filepath: false };
    this.isUploading = { coverImage: false, filepath: false };
    this.updateForm.setErrors(null); // Réinitialise les erreurs du formulaire si nécessaire
  }
}

