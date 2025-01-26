// comment.component.ts
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LikeButtonComponent } from './like-button/like-button.component';
import { ReplyFormComponent } from './reply-form/reply-form.component';
import { CommentService } from '../../services/comment.service';

import {User,Comment} from '../../interfaces/app.interfaces'
@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [CommonModule,LikeButtonComponent,ReplyFormComponent],
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent {
  @Input() comment!: Comment;
  @Input() colWidthIm: number = 1;
  @Input() colLikeLg: number = 2;
  @Input() colLikeMd: number = 4;
  @Input() moreThanOne: boolean = false;

  viewReplies: boolean = false;
  showReplyForm: boolean = false; // Déclaration de la propriété manquante
  constructor(private commentService: CommentService) {}

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
  toggleReplies() {
    this.viewReplies = !this.viewReplies; // Bascule l'affichage des réponses
  }
  toggleReplyForm() {
    console.log(this.showReplyForm);
    this.showReplyForm = !this.showReplyForm; // Bascule l'affichage du formulaire de réponse
  }

  handleReplySubmit(replyText: string) {
    this.toggleReplyForm();

    const newReply = {
      content: replyText,
      parent: this.comment,
      podcast: this.comment.podcast,
      episode: this.comment.episode,
      user: this.comment.user,
    };

    // Send to service
    this.commentService.addComment(newReply);
    this.viewReplies = true;
  }
}
