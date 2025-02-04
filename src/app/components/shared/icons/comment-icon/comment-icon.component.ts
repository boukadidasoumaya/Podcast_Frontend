import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importation de CommonModule

@Component({
  selector: 'app-comment-icon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './comment-icon.component.html',
  styleUrl: './comment-icon.component.css'
})
export class CommentIconComponent {
 @Input() numberOfComments: number = 0;


}
