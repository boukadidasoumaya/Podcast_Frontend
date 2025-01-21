import { Component } from '@angular/core';
import { UpdateModalComponent } from "../modals/update-modal/update-modal.component";
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-update',
  standalone: true,
  imports: [UpdateModalComponent,CommonModule],
  templateUrl: './update.component.html',
  styleUrl: './update.component.css'
})
export class UpdateComponent {
  isModalOpen: boolean = false;
  isPodcast: boolean = true;
  selectedEntity: any = null;
  podcast: any;
  episode: any;

  openModal(type: 'podcast' | 'episode', entity: any): void {
    this.isPodcast = type === 'podcast';
    this.selectedEntity = entity;
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  handleSave(updatedData: any): void {
    console.log('Saved data:', updatedData);
    this.closeModal();

    // Sauvegarde des données via une API ou autre logique ici
  }

}
