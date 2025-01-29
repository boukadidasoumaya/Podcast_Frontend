import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-like-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './like-button.component.html',
  styleUrl: './like-button.component.css'
})
export class LikeButtonComponent {
  @Input() isLiked: boolean = false;
  @Input() likesCount!: number;
  @Output() liked = new EventEmitter<boolean>();

  toggleLike() {
    this.isLiked = !this.isLiked;
    this.liked.emit(this.isLiked);
  }

}
