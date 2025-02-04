import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-edit-button',
  standalone: true,
  templateUrl: './edit-button.component.html',
  styleUrl: './edit-button.component.css'
})
export class EditButtonComponent {
  @Output() editClicked = new EventEmitter<void>();

  onClick() {
    this.editClicked.emit(); // Envoie l'événement au parent
  }
}
