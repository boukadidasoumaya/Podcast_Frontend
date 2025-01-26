import { Component, Input } from '@angular/core';
import { CommentComponent } from '../comment/comment.component';
import { CommonModule } from '@angular/common';
import { CommentService } from '../../services/comment.service';
import { Comment, Episode, EpisodeId, PodcastId, User } from '../../interfaces/app.interfaces';
import { ReplyFormComponent } from "../comment/reply-form/reply-form.component";

@Component({
  selector: 'app-comment-section',
  standalone: true,
  imports: [CommonModule, CommentComponent, ReplyFormComponent],
  templateUrl: './comment-section.component.html',
  styleUrl: './comment-section.component.css'
})
export class CommentSectionComponent {
  @Input() currentUser: Partial<User> = {};
  @Input() episode !:Episode;
  options: {
    podcast: PodcastId | null;
    episode: EpisodeId | null;
  } = {
    podcast: null,
    episode: null
  };
  comments: Comment[] = [];

  constructor(private commentService: CommentService) {

  }

  ngOnInit(): void {
    console.log('episode',this.episode);
    this.loadComments();
    this.commentService.onNewComment().subscribe((newComment: Comment) => {
      this.comments.push(newComment);
    });
  }

  loadComments(): void {
    this.options = {
      podcast: { id: this.episode.podcast.id },
      episode: { id: this.episode.id }
    };
    this.commentService.getComments(this.options).subscribe((comments: Comment[]) => {
      console.log(comments);
      this.comments = comments;
      console.log('options',this.options);

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
