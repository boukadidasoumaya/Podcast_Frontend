import { Component, EventEmitter, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importation de CommonModule

@Component({
  selector: 'app-heart-icon',
  templateUrl: './heart-icon.component.html',
  styleUrls: ['./heart-icon.component.css'],
  standalone: true,
  imports: [CommonModule] // Ajout de CommonModule ici
})
export class HeartIconComponent {
  @Input() isLiked: boolean=false;
  @Input() numberOfLikes: number = 0;
  @Output() liked = new EventEmitter<boolean>();

  toggleLike() {
    this.isLiked = !this.isLiked;
    this.liked.emit(this.isLiked);
    
  }
}
