import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-upload-podcast',
  standalone: true,
  imports: [],
  templateUrl: './upload-podcast.component.html',
  styleUrl: './upload-podcast.component.css'
})
export class UploadPodcastComponent {
  file: File | null = null;

  onSubmit() {
    if (this.file) {
      console.log('Podcast file:', this.file);
      // Ajoutez ici la logique pour télécharger le fichier
    }
  }
}
