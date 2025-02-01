import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CloudinaryService } from '../../../services/cloudinary.service';
import { PodcastService } from '../../../services/podcast.service';
import { EpisodeService } from '../../../services/episode.service';
import { Podcast,CreateEpisode } from '../../../models/podcast.model';
import { TrashComponent } from "../../trash/trash.component";

import { RouterModule } from '@angular/router';
@Component({
  imports: [CommonModule, FormsModule, TrashComponent,RouterModule],
  standalone: true,
  selector: 'app-podcast-modal',
  templateUrl: './podcast-modal.component.html',
  styleUrls: ['./podcast-modal.component.css'],
})
export class PodcastModalComponent {
  @ViewChild('closeBtn', { static: false }) closeBtn!: ElementRef<HTMLButtonElement>;
  
  isUploading = false; 

  step: number = 1;
  data: {
    podcast: Podcast;
    episodes: CreateEpisode[];
  } = {
    podcast: {
      name: '',
      topic: '',
      description: '',
      nbre_episode: 0,
      image: '',
    },
    episodes: [],
  };

  topics: string[] = ['Technology', 'Health', 'Science', 'Education'];

  constructor(
    private cloudinaryService: CloudinaryService,
    private podcastService: PodcastService,
    private episodeService: EpisodeService,
    private toastr: ToastrService,
    
  ) {}

 

  setEpisodesCount(count: number) {
    this.data.episodes = Array.from({ length: count }, (_, i) => ({
      name: '',
      description: '',
      duration: 0,
      filepath: '',
      coverImage: '',
      number: i + 1,  
      podcast: this.data.podcast,
    }));
  }

  nextStep() {
    if (this.step < 3) {
      this.step++;
    }
    console.log(this.data.podcast)
  }

  previousStep() {
    if (this.step > 1) {
      this.step--;
    }
  }

  async finishUpload() {
    try {
      if (
        !this.data.podcast.name ||
        !this.data.podcast.topic ||
        !this.data.podcast.description ||
        !this.data.podcast.image
      ) {
        this.toastr.error('Please fill in all required fields!', 'Error');
        return;
      }

      this.toastr.info('Upload in progress...', 'Info');
      
    
      if (this.data.podcast.image instanceof File) {
        const imageUrl = await this.cloudinaryService.uploadToCloudinary(this.data.podcast.image);
        this.data.podcast.image = imageUrl;
      }

    
      const createdPodcast = await this.podcastService.createPodcast(this.data.podcast).toPromise();
      console.log(createdPodcast)

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

       
        episode.podcast =  createdPodcast;

        
        await this.episodeService.createEpisode(episode).toPromise();
      }

     
      this.toastr.success('Podcast and episodes added successfully!', 'Success');
      this.resetForm();
      setTimeout(() => {
        this.closeBtn.nativeElement.click();
      }, 500);
    } catch (error) {
      console.error('Error during upload:', error);
      this.toastr.error('Error during upload.', 'Error');
     
    }finally {
      this.isUploading = false; 
    }
  }

  onFileSelect(event: Event, type: 'podcast' | 'episode' | 'episode-cover', index?: number) {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      this.uploadFileToCloudinary(input.files[0], type, index);
    }
  }

  async uploadFileToCloudinary(file: File, type: 'podcast' | 'episode' | 'episode-cover', index?: number) {
    try {
      const fileUrl = await this.cloudinaryService.uploadToCloudinary(file);

      if (type === 'podcast') {
        this.data.podcast.image = fileUrl;
      } else if (type === 'episode' && index !== undefined) {
        this.data.episodes[index].filepath = fileUrl;
      } else if (type === 'episode-cover' && index !== undefined) {
        this.data.episodes[index].coverImage = fileUrl;
      }

      this.toastr.success('File uploaded successfully!', 'Success');
    } catch (error) {
      console.log("c est posdbhbjhbjkkj",this.data.podcast)
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
    if (
      !this.data.podcast.name ||
      !this.data.podcast.topic ||
      !this.data.podcast.description ||
      !this.data.podcast.image
    ) {
      this.toastr.error('Please fill in all required fields!', 'Error');
      return false;
    }
    return true;
  }
  resetForm() {
    this.data = {
      podcast: { name: '', topic: '', description: '', nbre_episode: 0, image: '' },
      episodes: [],
    };
    this.step = 1;

  }
}
