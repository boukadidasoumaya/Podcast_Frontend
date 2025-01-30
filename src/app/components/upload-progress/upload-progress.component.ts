import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CloudinaryService } from '../../services/cloudinary.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-upload-progress',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './upload-progress.component.html',
  styleUrls: ['./upload-progress.component.css'],
})
export class UploadProgressComponent {
  @Input() accept!: string;
  @Input() buttonText!: string;
  @Input() showRemoveButton: boolean = true;
  @Output() fileUploaded = new EventEmitter<string>();
  @Output() fileRemoved = new EventEmitter<void>();
  @Output() uploadStatusChanged = new EventEmitter<boolean>();

  progress: number = 0;
  statusMessage: string = '';
  isUploading: boolean = false;
  uploadedFileUrl: string = '';

  constructor(private cloudinaryService: CloudinaryService) {}

  triggerFileInput(fileInput: HTMLInputElement): void {
    if (!this.isUploading) {
      fileInput.click();
    }
  }

  async onFileSelect(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];

      // Reset progress and status
      this.progress = 0;
      this.statusMessage = 'Starting upload...';
      this.isUploading = true;

      // Inform the parent that the upload has started
      this.uploadStatusChanged.emit(true);

      try {
        // Upload with progress tracking
        this.uploadedFileUrl = await this.cloudinaryService.uploadToCloudinaryWithProgress(file, (progress: number) => {
          this.progress = progress; // Update progress
          this.statusMessage = `Uploading: ${progress}%`; // Update the status message
        });

        this.statusMessage = 'Upload complete!';
        this.fileUploaded.emit(this.uploadedFileUrl);
      } catch (error) {
        this.statusMessage = 'Upload failed. Please try again.';
        console.error('Upload error:', error);
      } finally {
        this.isUploading = false;
        // Inform the parent that the upload is done
        this.uploadStatusChanged.emit(false);
      }
    }
  }

  removeFile(): void {
    this.uploadedFileUrl = '';
    this.progress = 0;
    this.statusMessage = '';
    this.fileRemoved.emit();
    // Inform the parent that the file has been removed
    this.uploadStatusChanged.emit(false);
  }
}
