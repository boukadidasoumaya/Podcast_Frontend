// comment.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LikeButtonComponent } from './like-button/like-button.component';
import { ReplyButtonComponent } from './reply-button/reply-button.component';

interface Comment {
  id: number;
  username: string;
  text: string;
  created_at: string;
  user_image: string;
  replies?: Comment[];
}

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [CommonModule,LikeButtonComponent,ReplyButtonComponent],
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent {
  @Input() comment!: Comment;
  @Input() colWidthIm: number = 1;
  @Input() colLikeLg: number = 2;
  @Input() colLikeMd: number = 4;
  @Input() moreThanOne: boolean = false;

  formatCreatedAt(createdAt: string): string {
    const date = new Date(createdAt);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  }

  trackById(index: number, item: Comment): number {
    return item.id;
  }
}
