import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-reply-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reply-button.component.html',
  styleUrl: './reply-button.component.css'
})
export class ReplyButtonComponent {
  @Input() iconClass: string = 'bi-reply';
  @Input() label: string = 'Reply';
}
