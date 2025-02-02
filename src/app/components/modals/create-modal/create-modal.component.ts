import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { UploadProgressComponent } from '../../upload-progress/upload-progress.component';

@Component({
  selector: 'app-create-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, UploadProgressComponent],
  templateUrl: './create-modal.component.html',
  styleUrls: ['./create-modal.component.css'],
})
export class CreateModalComponent implements OnInit {
  @Output() onCreate = new EventEmitter<any>();
  @Output() onClose = new EventEmitter<void>();

  createForm!: FormGroup;
  isFileUploaded = { coverImage: false, filepath: false };
  isUploading = { coverImage: false, filepath: false };
  isUploadInProgress: boolean = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.createForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      duration: [null, [Validators.required, Validators.min(0)]],
      filepath: [null],
      coverImage: [null],
      number: [null, [Validators.required, Validators.min(1)]], 
    });
  }

  handleUploadStatusChanged(isUploading: boolean): void {
    this.isUploadInProgress = isUploading;
  }

  isFormValid(): boolean {
    return this.createForm.valid && !this.isUploadInProgress;
  }

  createEntity(): void {
    if (this.isUploadInProgress) {
      console.log("En attente de l'upload...");
      return;
    }

    if (this.createForm.valid) {
      this.onCreate.emit(this.createForm.value);
      this.onClose.emit();
      this.closeModal();
    }
  }

  closeModal(): void {
    this.onClose.emit();
    this.resetFileUploads();
    this.createForm.reset();
  }

  handleFileUploaded(fileUrl: string, field: 'coverImage' | 'filepath'): void {
    this.isUploading[field] = false;
    this.isFileUploaded[field] = true;
    this.createForm.patchValue({ [field]: fileUrl });

    if (!this.isUploading.coverImage && !this.isUploading.filepath && this.createForm.valid) {
      this.createForm.markAsPristine();
    }
  }

  handleFileUploading(field: 'coverImage' | 'filepath'): void {
    this.isUploading[field] = true;
    this.createForm.setErrors({ uploadInProgress: true });
  }

  handleFileRemoved(field: 'coverImage' | 'filepath'): void {
    this.createForm.patchValue({ [field]: null });
    this.isFileUploaded[field] = false;
    this.isUploading[field] = false;
  }

  resetFileUploads(): void {
    this.isFileUploaded = { coverImage: false, filepath: false };
    this.isUploading = { coverImage: false, filepath: false };
    this.createForm.setErrors(null);
  }
}
