import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { UploadProgressComponent } from '../../upload-progress/upload-progress.component';
import { Episode } from '../../../interfaces/app.interfaces';

@Component({
  selector: 'app-update-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, UploadProgressComponent],
  templateUrl: './update-modal.component.html',
  styleUrls: ['./update-modal.component.css'],
})
export class UpdateModalComponent implements OnInit {
  @Input() type: 'episode' = 'episode'; // Only episode type
  @Input() entityData!: Partial<Episode>;
  @Output() onSave = new EventEmitter<any>();
  @Output() onClose = new EventEmitter<void>();

  updateForm!: FormGroup;
  isFileUploaded = { filepath: false, coverImage: false }; // Tracking upload status for files
  isUploading = { filepath: false, coverImage: false };  // Tracking upload progress
  isUploadInProgress: boolean = false;  // Track overall upload progress

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.updateForm = this.fb.group({
      name: [this.entityData?.name, Validators.required],
      description: [this.entityData?.description, Validators.required],
      duration: [this.entityData?.duration, [Validators.required, Validators.min(0)]],
      filepath: [this.entityData?.filepath || null],
      coverImage: [this.entityData?.coverImage || null],
    });
  }

  handleUploadStatusChanged(isUploading: boolean): void {
    this.isUploadInProgress = isUploading;
  }

  isFormValid(): boolean {
    return this.updateForm.valid && !this.isUploadInProgress; // Disable save if upload is in progress
  }

  saveChanges(): void {
    if (this.isUploadInProgress) {
      console.log('Waiting for upload to finish...');
      return;
    }

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
      filepath: this.entityData?.filepath || null,
      coverImage: this.entityData?.coverImage || null,
    });
  }

  handleFileUploaded(fileUrl: string, field: 'coverImage' | 'filepath'): void {
    this.isUploading[field] = false;
    this.isFileUploaded[field] = true;
    this.updateForm.patchValue({ [field]: fileUrl });

    if (!this.isUploading.coverImage && !this.isUploading.filepath && this.updateForm.valid) {
      this.updateForm.markAsPristine();
    }
  }

  handleFileUploading(field: 'coverImage' | 'filepath'): void {
    this.isUploading[field] = true;
    this.updateForm.setErrors({ uploadInProgress: true });
  }

  handleFileRemoved(field: 'coverImage' | 'filepath'): void {
    const initialValue = this.entityData?.[field];
    this.updateForm.patchValue({ [field]: initialValue || null });
    this.isFileUploaded[field] = false;
    this.isUploading[field] = false;
  }

  resetFileUploads(): void {
    this.isFileUploaded = { filepath: false, coverImage: false };
    this.isUploading = { filepath: false, coverImage: false };

    this.updateForm.patchValue({
      coverImage: this.entityData?.coverImage || null,
      filepath: this.entityData?.filepath || null,
    });

    this.updateForm.setErrors(null);
  }
}
