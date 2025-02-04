import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CloudinaryService } from '../../services/cloudinary.service';
import { EpisodeService } from '../../services/episode.service';
import { PodcastService } from '../../services/podcast.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-upload-progress',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './upload-progress.component.html',
  styleUrls: ['./upload-progress.component.css'],
})
export class UploadProgressComponent {
  @Input() accept!: string;
  @Input() type!: 'episode' | 'podcast'; // Type du fichier
  @Input() fileCategory!: 'coverImage' | 'filepath'; // Spécifie image ou fichier
  @Input() buttonText!: string;
  @Input() showRemoveButton: boolean = true;
  @Output() fileUploaded = new EventEmitter<string>();
  @Output() fileRemoved = new EventEmitter<void>();
  @Output() uploadStatusChanged = new EventEmitter<boolean>();

  progress: number = 0;
  statusMessage: string = '';
  isUploading: boolean = false;
  uploadedFileUrl: string = '';

  constructor(
    private cloudinaryService: CloudinaryService,
    private episodeService: EpisodeService,
    private podcastService: PodcastService,
    private userService:UserService,
    private toastr: ToastrService
  ) {}

  triggerFileInput(fileInput: HTMLInputElement): void {
    if (!this.isUploading) {
      fileInput.click();
    }
  }

  async onFileSelect(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.toastr.error('Erreur');

      const isValid = await this.validateFile(file);
      if (!isValid) return; // Arrête le processus en cas d'erreur

      // Reset progress et status
      this.progress = 0;
      this.statusMessage = 'Starting upload...';
      this.isUploading = true;
      this.uploadStatusChanged.emit(true);

      try {
        // Upload avec suivi de la progression
        this.uploadedFileUrl = await this.cloudinaryService.uploadToCloudinaryWithProgress(
          file,
          (progress: number) => {
            this.progress = progress;
            this.statusMessage = `Uploading: ${progress}%`;
          }
        );

        this.statusMessage = 'Upload complete!';
        this.fileUploaded.emit(this.uploadedFileUrl);
      } catch (error) {
        this.statusMessage = 'Upload failed. Please try again.';
        this.toastr.error('Échec de l’upload. Réessayez.', 'Erreur');
        console.error('Upload error:', error);
      } finally {
        this.isUploading = false;
        this.uploadStatusChanged.emit(false);
      }
    }
  }

  removeFile(): void {
    this.uploadedFileUrl = '';
    this.progress = 0;
    this.statusMessage = '';
    this.fileRemoved.emit();
    this.uploadStatusChanged.emit(false);
  }


private async validateFile(file: File): Promise<boolean> {
  let validationObservable;

  if (this.type === 'episode') {
    validationObservable = this.fileCategory === 'coverImage'
      ? this.episodeService.uploadImage(file)
      : this.episodeService.uploadVideo(file);
  } else if (this.type==='podcast') {
    validationObservable = this.podcastService.uploadImage(file);
  }else{
    validationObservable=this.userService.uploadImage(file);
  }

  try {
    const response = await validationObservable.toPromise();
    // Supposons que la réponse contienne { message: string, filename: string }
    const successMessage = response?.message || 'Fichier téléchargé avec succès!';
    return true;
  } catch (error) {
    if (error instanceof HttpErrorResponse) {
      // Accéder à l'erreur envoyée par le serveur
      const errorMessage = error.error?.message || 'Une erreur est survenue pendant l\'upload.';
      this.toastr.error(errorMessage, 'Erreur');
    } else {
      // Erreur inconnue
      this.toastr.error('Une erreur inconnue est survenue.', 'Erreur');
    }
    return false;
  }
}


}
