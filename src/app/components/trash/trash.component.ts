import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-trash',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trash.component.html',
  styleUrl: './trash.component.css'
})
export class TrashComponent {
  @Output() delete = new EventEmitter<void>(); 

  onDelete() {
    console.log('Trash button clicked!');
    this.delete.emit();
  }
}
