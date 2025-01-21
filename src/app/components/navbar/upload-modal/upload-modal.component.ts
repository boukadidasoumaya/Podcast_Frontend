import { Component } from '@angular/core';
import { UploadPodcastComponent } from "./upload-podcast/upload-podcast.component";

@Component({
  selector: 'app-upload-modal',
  standalone: true,
  imports: [UploadPodcastComponent],
  templateUrl: './upload-modal.component.html',
  styleUrl: './upload-modal.component.css'
})
export class UploadModalComponent {

}
