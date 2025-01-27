import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-podcast-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './podcast-modal.component.html',
  styleUrls: ['./podcast-modal.component.css'],
})
export class PodcastModalComponent {
  step = 1;
  podcastForm: FormGroup;
  episodesCount = 0;
  episodeForm: FormGroup[] = [];
  topics: string[] = [
    'Technology',
    'Health and Wellness',
    'Education',
    'Entertainment',
    'Business',
    'Society and Culture',
    'Hobbies and Lifestyle',
    'News and Politics',
    'Spirituality and Religion',
    'Comedy',
  ];

  constructor(private fb: FormBuilder) {
    this.podcastForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      image: [null],
      episodesCount: [0, [Validators.required, Validators.min(1), Validators.max(2)]], 
    });
  }

  setEpisodesCount(count: number): void {
    this.episodesCount = Math.min(count, 10); 
    this.episodeForm = [];
    for (let i = 0; i < this.episodesCount; i++) {
      this.episodeForm.push(
        this.fb.group({
          name: ['', Validators.required],
          description: ['', Validators.required],
          topic: ['', Validators.required], 
          file: [null],
        })
      );
    }
  }

  triggerFileInput(fileInput: HTMLInputElement): void {
    fileInput.click();
  }

  onFileSelect(event: Event, controlNameOrIndex: string | number): void {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      const file = input.files[0];
      if (typeof controlNameOrIndex === 'string') {
        this.podcastForm.get(controlNameOrIndex)?.setValue(file);
      } else {
        this.episodeForm[controlNameOrIndex].get('file')?.setValue(file);
      }
    }
  }

  nextStep(): void {
    if (this.step < 3) this.step++;
  }

  previousStep(): void {
    if (this.step > 1) this.step--;
  }

  finishUpload(): void {
    console.log('Podcast form data:', this.podcastForm.value);
    console.log('Episode forms data:', this.episodeForm.map((form) => form.value));
  }
}
