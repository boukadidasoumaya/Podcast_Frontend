// comment.component.ts
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LikeButtonComponent } from './like-button/like-button.component';
import { ReplyFormComponent } from './reply-form/reply-form.component';
import { CommentService } from '../../services/comment.service';

import {User,Comment} from '../../interfaces/app.interfaces'
import { LikeCommentService } from '../../services/likeComment.service';
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
  @Input() isLiked: boolean = false;
  @Input() likesCount!: number;
  @Output() liked = new EventEmitter<{ isLiked: boolean, comment:Comment }>();

  viewReplies: boolean = false;
  showReplyForm: boolean = false; // Déclaration de la propriété manquante
    // Stockage local des likes pour les réponses
  private replyLikes: { [replyId: number]: number } = {};
  private replyLikedState: { [replyId: number]: boolean } = {};

  constructor(private commentService: CommentService,private likeCommentService:LikeCommentService) {}
  ngOnChanges() {
    // Initialiser les likes pour les réponses
    if (this.comment.replies) {
      this.comment.replies.forEach(reply => {
        this.replyLikes[reply.id] = reply.likesCount || 0;
      });
    }
  }
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
  // Modified method to emit the liked event
  onLikeChanged(liked: boolean) {
    this.liked.emit({ isLiked: liked, comment: this.comment });
  }
  // Méthodes pour gérer les likes des réponses
  isReplyLiked(replyId: number): boolean {
    return this.replyLikedState[replyId] || false;
  }

  getReplyLikesCount(replyId: number): number {
    return this.replyLikes[replyId] || 0;
  }

  onReplyLikeChanged(event: { isLiked: boolean, comment: Comment }) {
    // Mettre à jour l'état local
    const replyId = event.comment.id;
    this.replyLikedState[replyId] = event.isLiked;

    // Propager l'événement vers le haut
    this.liked.emit(event);
  }
}
