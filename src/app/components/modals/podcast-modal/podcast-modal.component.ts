import { Component } from '@angular/core';
import { Podcast, Episode } from '../../models/episode.model';
import { CloudinaryService } from '../../../services/cloudinary.service';
import { PodcastService } from '../../../services/podcast.service';
import { EpisodeService } from '../../../services/episode.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [CommonModule, FormsModule],
  standalone: true,
  selector: 'app-podcast-modal',
  templateUrl: './podcast-modal.component.html',
  styleUrls: ['./podcast-modal.component.css']
})
export class PodcastModalComponent {
  step: number = 1;
  data: {
    podcast: Podcast;
    episodes: Episode[];
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
    private episodeService: EpisodeService
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
      // Step 1: Upload Podcast Image (only if it's a File object)
      if (this.data.podcast.image instanceof File) {
        const imageUrl = await this.cloudinaryService.uploadToCloudinary(this.data.podcast.image);
        this.data.podcast.image = imageUrl;
      }

      // Save podcast data in backend
      const createdPodcast = await this.podcastService.createPodcast(this.data.podcast).toPromise();

      if (!createdPodcast) {
        throw new Error('Podcast creation failed');
      }

      // Step 2: Upload and create episodes
      for (const episode of this.data.episodes) {
        // Upload episode file to Cloudinary
        if (episode.filepath instanceof File) {
          const episodeFileUrl = await this.cloudinaryService.uploadToCloudinary(episode.filepath);
          episode.filepath = episodeFileUrl;
        }

        // Upload episode cover image if it's a File object
        if (episode.coverImage instanceof File) {
          const coverImageUrl = await this.cloudinaryService.uploadToCloudinary(episode.coverImage);
          episode.coverImage = coverImageUrl;
        }

        // Link episode to the created podcast
        episode.podcast = createdPodcast;
        await this.episodeService.createEpisode(episode).toPromise();
      }

      console.log('Podcast and episodes uploaded successfully');
    } catch (error) {
      console.error('Error during upload:', error);
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
      console.log(this.data)
      if (type === 'podcast') {
        this.data.podcast.image = fileUrl;
      } else if (type === 'episode' && index !== undefined) {
        this.data.episodes[index].filepath = fileUrl;
      } else if (type === 'episode-cover' && index !== undefined) {
        this.data.episodes[index].coverImage = fileUrl;
      }
    } catch (error) {
      console.error('Error uploading to Cloudinary:', error);
    }
  }

  
  

  triggerFileInput(fileInput: HTMLInputElement) {
    fileInput.click();
  }
}
