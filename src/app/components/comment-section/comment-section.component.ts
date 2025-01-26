import { Component, Input } from '@angular/core';
import { CommentComponent } from '../comment/comment.component';
import { CommonModule } from '@angular/common';
import { CommentService } from '../../services/comment.service';
import { Comment, User } from '../../interfaces/app.interfaces';
import { ReplyFormComponent } from "../comment/reply-form/reply-form.component";

@Component({
  selector: 'app-comment-section',
  standalone: true,
  imports: [CommonModule, CommentComponent, ReplyFormComponent],
  templateUrl: './comment-section.component.html',
  styleUrl: './comment-section.component.css'
})
export class CommentSectionComponent {
  @Input() options: any = {};
  @Input() currentUser: Partial<User> = {};

  comments: Comment[] = [];

  constructor(private commentService: CommentService) {}

  ngOnInit(): void {
    this.loadComments();

    // Listen for new comments and update the list
    this.commentService.onNewComment().subscribe((newComment: Comment) => {
      this.comments.push(newComment);
    });
  }

  loadComments(): void {
    this.commentService.getComments(this.options).subscribe((comments: Comment[]) => {
      this.comments = comments;
    });
  }

  handleReplySubmit(replyText: string) {

    const newReply = {
      content: replyText,
      parent: null,
      podcast: this.options.podcast,
      episode: this.options.episode,
      user: this.currentUser,
    };

    // Send to service
    this.commentService.addComment(newReply);
  }
}
