import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CloudinaryService } from '../../../services/cloudinary.service';
import { PodcastService } from '../../../services/podcast.service';
import { EpisodeService } from '../../../services/episode.service';
import { CreatePodcast, CreateEpisode } from '../../../models/podcast.model';
import { TrashComponent } from "../../trash/trash.component";
import { RouterModule } from '@angular/router';

@Component({
  imports: [CommonModule, FormsModule, TrashComponent, RouterModule],
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

  topics: string[] = ['Technology', 'Health', 'Science', 'Education'];

  constructor(
    private cloudinaryService: CloudinaryService,
    private podcastService: PodcastService,
    private episodeService: EpisodeService,
    private toastr: ToastrService,
  ) {}

  // Ajouter un nouvel épisode
  addEpisode(): void {
    this.data.episodes.push({
      name: '',
      description: '',
      duration: 0,
      filepath: '',
      coverImage: '',
      number: this.data.episodes.length + 1, // Numéro de l'épisode
      podcast: this.data.podcast,
    });
  }

  // Passer à l'étape suivante
  nextStep() {
    if (this.step < 3) {
      this.step++;
    }
  }

  // Revenir à l'étape précédente
  previousStep() {
    if (this.step > 1) {
      this.step--;
    }
  }

  

  // Valider l'étape 1
  isStep1Valid(): boolean {
    return (
      !!this.data.podcast.name &&
      !!this.data.podcast.topic &&
      !!this.data.podcast.description &&
      !!this.data.podcast.image
    );
  }

  // Valider l'étape 2
  isStep2Valid(): boolean {
    return this.data.episodes.every(
      (episode) =>
        !!episode.name &&
        !!episode.description &&
        !!episode.duration &&
        !!episode.filepath
    );
  }

  // Désactiver le bouton "Next" si l'étape actuelle n'est pas valide
  isNextButtonDisabled(): boolean {
    if (this.step === 1) {
      return !this.isStep1Valid();
    } else if (this.step === 2) {
      return !this.isStep2Valid();
    }
    return false;
  }

  // Terminer l'upload
  async finishUpload() {
    try {
      if (!this.isStep1Valid() || !this.isStep2Valid()) {
        this.toastr.error('Please fill in all required fields!', 'Error');
        return;
      }

      this.isUploading = true;
      this.toastr.info('Upload in progress...', 'Info');

      // Upload de l'image du podcast
      if (this.data.podcast.image instanceof File) {
        const imageUrl = await this.cloudinaryService.uploadToCloudinary(this.data.podcast.image);
        this.data.podcast.image = imageUrl;
      }

      // Créer le podcast
      const createdPodcast = await this.podcastService.createPodcast(this.data.podcast).toPromise();
      if (!createdPodcast) {
        throw new Error('Podcast creation failed');
      }

      // Upload des épisodes
      for (const episode of this.data.episodes) {
        if (episode.filepath instanceof File) {
          const episodeFileUrl = await this.cloudinaryService.uploadToCloudinary(episode.filepath);
          episode.filepath = episodeFileUrl;
        }

        if (episode.coverImage instanceof File) {
          const coverImageUrl = await this.cloudinaryService.uploadToCloudinary(episode.coverImage);
          episode.coverImage = coverImageUrl;
        }

        // Associer l'épisode au podcast créé
        episode.podcast = createdPodcast;

        // Créer l'épisode
        await this.episodeService.createEpisode(episode).toPromise();
      }

      // Afficher un message de succès et réinitialiser le formulaire
      this.toastr.success('Podcast and episodes added successfully!', 'Success');
      this.resetForm();
      setTimeout(() => {
        this.closeBtn.nativeElement.click();
      }, 500);
    } catch (error) {
      console.error('Error during upload:', error);
      this.toastr.error('Error during upload.', 'Error');
    } finally {
      this.isUploading = false;
    }
  }

  // Gérer la sélection de fichiers
  onFileSelect(event: Event, type: 'podcast' | 'episode' | 'episode-cover', index?: number) {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      this.uploadFileToCloudinary(input.files[0], type, index);
    }
  }

  // Uploader un fichier vers Cloudinary
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
      console.error('Error uploading to Cloudinary:', error);
      this.toastr.error('Error uploading file.', 'Error');
    }
  }

  // Déclencher l'input de fichier
  triggerFileInput(fileInput: HTMLInputElement) {
    fileInput.click();
  }

  // Supprimer un fichier
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

  // Réinitialiser le formulaire
  resetForm() {
    this.data = {
      podcast: { name: '', topic: '', description: '', image: '' },
      episodes: [],
    };
    this.step = 1;
  }

  // Propriété calculée pour obtenir le nombre d'épisodes
  get nbre_episode(): number {
    return this.data.episodes.length;
  }
}