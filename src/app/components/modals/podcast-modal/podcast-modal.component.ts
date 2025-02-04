import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CloudinaryService } from '../../../services/cloudinary.service';
import { PodcastService } from '../../../services/podcast.service';
import { EpisodeService } from '../../../services/episode.service';
import { CreatePodcast, CreateEpisode } from '../../../models/podcast.model';
import { RouterModule } from '@angular/router';
import { UploadProgressComponent } from "../../upload-progress/upload-progress.component";
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-podcast-modal',
  templateUrl: './podcast-modal.component.html',
  styleUrls: ['./podcast-modal.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, UploadProgressComponent],
})
export class PodcastModalComponent {
  @ViewChild('closeBtn', { static: false }) closeBtn!: ElementRef<HTMLButtonElement>;

  isFileUploaded = { filepath: false, coverImage: false };
  isUploading = { filepath: false, coverImage: false };
  isUploadInProgress: boolean = false;

  isFileUploadedPodcast = { image: false };
  isUploadingPodcast = { image: false };
  isUploadInProgressPodcast: boolean = false;

  uploading = false;
  isValidFile: boolean = false;
  showCancelModal: boolean = false;


  step: number = 1;
  data: {
    podcast: CreatePodcast;
    episodes: CreateEpisode[];
  } = {
    podcast: {
      name: '',
      topic: '',
      description: '',
      image: '',
    },
    episodes: [],
  };

  constructor(
    private cloudinaryService: CloudinaryService,
    private podcastService: PodcastService,
    private episodeService: EpisodeService,
    private toastr: ToastrService,
  ) {}

  addEpisode(): void {
    this.data.episodes.push({
      name: '',
      description: '',
      duration: 0,
      filepath: '',
      coverImage: '',
      number: this.data.episodes.length + 1,
      podcast: this.data.podcast,
    });
  }

  nextStep() {
    if (this.step === 1 && !this.isStep1Valid()) {
      this.toastr.error('Please fill in all required fields for the podcast!', 'Error');

      return;
    }
    if (this.step === 1 && !this.isStep2Valid()) {
      this.toastr.error('Please fill in all required fields for the episode!', 'Error');

      return;
    }

    if (this.step === 1 && this.isStep1Valid() && this.step < 3) {
      this.step++;
      this.addEpisode();
    } else if (this.step < 3) {
      this.step++;
    }
  }



  previousStep() {
    if (this.step > 1) {
      this.step--;
    }
  }

  isStep1Valid(): boolean {
    return !!this.data.podcast.name && !!this.data.podcast.topic && !!this.data.podcast.description&& !!this.data.podcast.image;
  }

  isStep2Valid(): boolean {
    return this.data.episodes.every(
      (episode) => !!episode.name && !!episode.description && !!episode.duration && !!episode.filepath && !!episode.coverImage
    );
  }


  async finishUpload() {
    try {
      if (!this.isStep1Valid() || !this.isStep2Valid()) {
        this.toastr.error('Please fill in all required fields!', 'Error');
        return;
      }

      this.uploading = true;
      this.toastr.info('Upload in progress...', 'Info');

      const createdPodcast = await firstValueFrom(this.podcastService.createPodcast(this.data.podcast));
      if (!createdPodcast) {
        throw new Error('Podcast creation failed');
      }

      for (const episode of this.data.episodes) {
        episode.podcast = createdPodcast;
        await firstValueFrom(this.episodeService.createEpisode(episode));
      }

      this.toastr.success('Podcast and episodes added successfully!', 'Success');
      this.resetForm();
      setTimeout(() => {
        this.closeBtn.nativeElement.click();
      }, 500);
    } catch (error) {
      console.error('Error during upload:', error);
      this.toastr.error('Error during upload.', 'Error');
    } finally {
      this.uploading = false;
    }
  }

  triggerFileInput(fileInput: HTMLInputElement) {
    fileInput.click();
  }

  openCancelModal() {
    this.showCancelModal = true; 
  }

  confirmCancel() {
    this.showCancelModal = false;
    this.cancelUpload(); 
  }

  cancelCancel() {
    this.showCancelModal = false; 
  }

  cancelUpload() {
    this.step = 1; 
    this.resetForm();
    this.closeBtn.nativeElement.click(); 
  }
  
  resetForm(): void {
    this.data = {
      podcast: {
        name: '',
        topic: '',
        description: '',
        image: '',
      },
      episodes: [],
    };
    this.step = 1;
    this.isFileUploadedPodcast = { image: false };
    this.isUploadingPodcast = { image: false };
    this.isUploadInProgressPodcast = false;
    this.isFileUploaded = { filepath: false, coverImage: false };
    this.isUploading = { filepath: false, coverImage: false };
    this.isUploadInProgress = false;
  }
  
  get nbre_episode(): number {
    return this.data.episodes.length;
  }

  handleFileUploaded(fileUrl: string, field: 'coverImage' | 'filepath', index: number): void {
    this.isUploading[field] = false;
    this.isFileUploaded[field] = true;
    this.data.episodes[index][field] = fileUrl;
  }

  handleUploadStatusChanged(isUploading: boolean): void {
    this.isUploadInProgress = isUploading;
  }

  handleFileRemoved(field: 'coverImage' | 'filepath', index: number): void {
    this.data.episodes[index][field] = '';
    this.isFileUploaded[field] = false;
    this.toastr.info('File removed successfully!', 'Info');
  }

  handleUploadStatusChangedPodcastPodcast(isUploadingPodcast: boolean): void {
    this.isUploadInProgressPodcast = isUploadingPodcast;
  }

  handleFileUploadedPodcast(fileUrl: string): void {
    this.isUploadingPodcast.image = false;
    this.isFileUploadedPodcast.image = true;
    this.data.podcast.image = fileUrl;
  }

  handleFileRemovedPodcast(): void {
    this.data.podcast.image = '';
    this.isFileUploadedPodcast.image = false;
    this.isUploadingPodcast.image = false;
  }
}