import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { UploadProgressComponent } from '../../upload-progress/upload-progress.component';

@Component({
  selector: 'app-update-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,UploadProgressComponent],
  templateUrl: './update-modal.component.html',
  styleUrls: ['./update-modal.component.css'],
})
export class UpdateModalComponent implements OnInit {
  @Input() isPodcast: boolean = true;
  @Input() entityData: any;
  @Output() onSave = new EventEmitter<any>();
  @Output() onClose = new EventEmitter<void>();

  updateForm!: FormGroup;

  constructor(private fb: FormBuilder) {}
  triggerFileInput(fileInput: HTMLInputElement): void {
    fileInput.click();
  }

  ngOnInit(): void {
    this.updateForm = this.fb.group({
      name: [this.entityData?.name || '', Validators.required],
      description: [this.entityData?.description || '', Validators.required],
      file: [null], // Champs spécifique aux épisodes
      image: [null], // Champs spécifique aux podcasts
    });
  }

  onFileSelect(event: Event, field: string = 'file'): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.updateForm.patchValue({ [field]: input.files[0] });
    }
  }

  saveChanges(): void {
    if (this.updateForm.valid) {
      this.onSave.emit(this.updateForm.value); // Émet les données mises à jour
    }
  }

  closeModal(): void {
    this.onClose.emit(); // Émet l'événement de fermeture
  }
  handleFileUploaded(fileUrl: string): void {
    console.log('File uploaded successfully:', fileUrl);
    // You can save the uploaded URL or do further actions
  }
}
