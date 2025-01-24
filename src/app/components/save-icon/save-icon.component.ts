import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-save-icon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './save-icon.component.html',
  styleUrl: './save-icon.component.css'
})
export class SaveIconComponent {
  isBookmarked: boolean = false;

  toggleBookmark(): void {
    this.isBookmarked = !this.isBookmarked;
  }
}
