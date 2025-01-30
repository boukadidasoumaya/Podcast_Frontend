import { Component } from '@angular/core';
import { PodcastS, EpisodeS } from '../../../models/episode.model';
import { CloudinaryService } from '../../../services/cloudinary.service';
import { PodcastService } from '../../../services/podcast.service';
import { EpisodeService } from '../../../services/episode.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  imports: [CommonModule, FormsModule],
  standalone: true,
  selector: 'app-podcast-modal',
  templateUrl: './podcast-modal.component.html',
  styleUrls: ['./podcast-modal.component.css'],
})
export class PodcastModalComponent {
  step: number = 1;
  data: {
    podcast: PodcastS;
    episodes: EpisodeS[];
  } = {
    podcast: {
      createdAt: '',
      updatedAt: '',
      deletedAt: null,
      id: 0,
      name: '',
      views: 0,
      topic: '',
      duration: '',
      description: '',
      image: '',
      rating: 0,
      download_Count: 0,
      nbre_episode: 0
    },
    episodes: []
  };

  topics: string[] = ['Technology', 'Health', 'Science', 'Education'];

  constructor(
    private cloudinaryService: CloudinaryService,
    private podcastService: PodcastService,
    private episodeService: EpisodeService,
    private toastr: ToastrService
  ) {}

  setEpisodesCount(count: number) {
    this.data.episodes = Array.from({ length: count }, (_, i) => ({
      createdAt: '',
      updatedAt: '',
      deletedAt: null,
      id: 0,
      name: '',
      number: i + 1,
      description: '',
      duration: 0,
      filepath: '',
      coverImage: '',
      views: 0,
      podcast: this.data.podcast
    }));
  }

  nextStep() {
    if (this.step < 3) {
      this.step++;
    }
  }

  previousStep() {
    if (this.step > 1) {
      this.step--;
    }
  }

  async finishUpload() {
    try {
      if (!this.data.podcast.name || !this.data.podcast.topic || !this.data.podcast.description || !this.data.podcast.image) {
        this.toastr.error('Please fill in all required fields!', 'Error');
        return;
      }

      this.toastr.info('Upload in progress...', 'Info');

      if (this.data.podcast.image instanceof File) {
        const imageUrl = await this.cloudinaryService.uploadToCloudinary(this.data.podcast.image);
        this.data.podcast.image = imageUrl;
      }

      const createdPodcast = await this.podcastService.createPodcast(this.data.podcast).toPromise();
      if (!createdPodcast) {
        throw new Error('Podcast creation failed');
      }

      for (const episode of this.data.episodes) {
        if (episode.filepath instanceof File) {
          const episodeFileUrl = await this.cloudinaryService.uploadToCloudinary(episode.filepath);
          episode.filepath = episodeFileUrl;
        }

        if (episode.coverImage instanceof File) {
          const coverImageUrl = await this.cloudinaryService.uploadToCloudinary(episode.coverImage);
          episode.coverImage = coverImageUrl;
        }

        episode.podcast = createdPodcast;
        await this.episodeService.createEpisode(episode).toPromise();
      }

      console.log('Podcast and episodes uploaded successfully');
      this.toastr.success('Podcast and episodes added successfully!', 'Success');
    } catch (error) {
      console.error('Error during upload:', error);
      this.toastr.error('Error during upload.', 'Error');
    }
  }

  onFileSelect(event: Event, type: 'podcast' | 'episode' | 'episode-cover', index?: number) {
    const input = event.target as HTMLInputElement;
    if (input && input.files && input.files[0]) {
      const file = input.files[0];
      this.uploadFileToCloudinary(file, type, index);
    }
  }

  async uploadFileToCloudinary(file: File, type: 'podcast' | 'episode' | 'episode-cover', index?: number) {
    try {
      const fileUrl = await this.cloudinaryService.uploadToCloudinary(file);

      if (type === 'podcast') {
        this.data.podcast.image = fileUrl;
        this.toastr.success('Podcast image uploaded successfully!', 'Success');
      } else if (type === 'episode' && index !== undefined) {
        this.data.episodes[index].filepath = fileUrl;
        this.toastr.success(`Episode ${index + 1} file uploaded successfully!`, 'Success');
      } else if (type === 'episode-cover' && index !== undefined) {
        this.data.episodes[index].coverImage = fileUrl;
        this.toastr.success(`Episode ${index + 1} cover image uploaded successfully!`, 'Success');
      }
    } catch (error) {
      console.error('Error uploading to Cloudinary:', error);
      this.toastr.error('Error uploading file.', 'Error');
    }
  }

  triggerFileInput(fileInput: HTMLInputElement) {
    fileInput.click();
  }


  removeFile(type: 'podcast' | 'episode' | 'episode-cover', index?: number) {
    if (type === 'podcast') {
      this.data.podcast.image = '';
    } else if (type === 'episode' && index !== undefined) {
      this.data.episodes[index].filepath = '';
    } else if (type === 'episode-cover' && index !== undefined) {
      this.data.episodes[index].coverImage = '';
    }
    this.toastr.info('File removed successfully!', 'Info');
  }

  checkRequiredFields() {
    if (!this.data.podcast.name || !this.data.podcast.topic || !this.data.podcast.description || !this.data.podcast.image) {
      this.toastr.error('Please fill in all required fields!', 'Error');
      return false;
    }
    return true;
  }
}
