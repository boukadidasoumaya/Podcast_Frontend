import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './update-modal.component.html',
  styleUrls: ['./update-modal.component.css'],
})
export class UpdateModalComponent implements OnInit {
  @Input() isPodcast: boolean = true; // Détermine si c'est un podcast ou un épisode
  @Input() entityData: any; // Données initiales pour le formulaire
  @Output() onSave = new EventEmitter<any>(); // Émet les données mises à jour au parent
  @Output() onClose = new EventEmitter<void>(); // Émet un événement lors de la fermeture du modal

  updateForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.updateForm = this.fb.group({
      title: [this.entityData?.title || '', Validators.required],
      description: [this.entityData?.description || '', Validators.required],
      file: [null], // Champs spécifique aux épisodes
      image: [null], // Champs spécifique aux podcasts
    });
  }

  onFileSelect(event: Event, field: string = 'file'): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.updateForm.patchValue({ [field]: input.files[0] });
    }
  }

  saveChanges(): void {
    if (this.updateForm.valid) {
      this.onSave.emit(this.updateForm.value); // Émet les données mises à jour
    }
  }

  closeModal(): void {
    this.onClose.emit(); // Émet l'événement de fermeture
  }
}
