// comment.component.ts
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LikeButtonComponent } from './like-button/like-button.component';
import { ReplyFormComponent } from './reply-form/reply-form.component';
import { CommentService } from '../../services/comment.service';

import {User,Comment} from '../../interfaces/app.interfaces'
import { LikeCommentService } from '../../services/likeComment.service';
import { DeleteButtonComponent } from './delete-button/delete-button.component';
@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [CommonModule,LikeButtonComponent,ReplyFormComponent,DeleteButtonComponent],
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
  @Input() currentUser!:Partial<User>;
  @Output() liked = new EventEmitter<{ isLiked: boolean, comment:Comment }>();
  @Output() deletedComment=new EventEmitter<Comment>
  @Output() replyAdded = new EventEmitter<Comment>(); // New event emitter for replies

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

  async handleReplySubmit(replyText: string) {
    try {
      const newReply = {
        content: replyText,
        parent: this.comment,
        podcast: this.comment.podcast,
        episode: this.comment.episode,
        user: this.currentUser,

      };

      // Send to service and wait for the response
      const reply:Comment = await this.commentService.addComment(newReply);

      // this.comment.replies?.push(reply);
      // Show replies and hide reply form
      this.viewReplies = true;
      this.showReplyForm = false;

    } catch (error) {
      console.error('Error creating reply:', error);
      // Handle error appropriately
    }
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
    const replyId = event.comment.id;
    this.replyLikedState[replyId] = event.isLiked;
    this.liked.emit(event);
  }

  deleteMessage() {
    console.log('Le message a été supprimé');
    this.deletedComment.emit(this.comment);
  }
  isCurrentUserCommentOwner(): boolean {
    return this.currentUser?.id === this.comment.user.id;
  }

}
