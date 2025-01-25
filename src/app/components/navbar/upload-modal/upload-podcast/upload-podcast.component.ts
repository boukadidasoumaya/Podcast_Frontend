import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-upload-podcast',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './upload-podcast.component.html',
  styleUrl: './upload-podcast.component.css'
})
export class UploadPodcastComponent {
  file: File | null = null;
  title: string = '';
  description: string = '';

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.file = file;
    }
  }

  onSubmit(): void {
    if (this.file && this.title && this.description) {
      const formData = new FormData();
      formData.append('file', this.file);
      formData.append('title', this.title);
      formData.append('description', this.description);

      // Appeler le service pour télécharger le podcast
      console.log('Podcast uploaded:', {
        title: this.title,
        description: this.description
      });
    }
  }
}
