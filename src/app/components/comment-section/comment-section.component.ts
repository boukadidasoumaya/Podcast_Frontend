import { Component, Input } from '@angular/core';
import { CommentComponent } from '../comment/comment.component';
import { CommonModule } from '@angular/common';
import { CommentService } from '../../services/comment.service';
import { Comment, User } from '../../interfaces/app.interfaces';
import { PodcastId , EpisodeId ,Episode } from '../../interfaces/app.interfaces';
import { ReplyFormComponent } from "../comment/reply-form/reply-form.component";
import { SectionCustomComponent } from "../section-custom/section-custom.component";

@Component({
  selector: 'app-comment-section',
  standalone: true,
  imports: [CommonModule, CommentComponent, ReplyFormComponent, SectionCustomComponent],
  templateUrl: './comment-section.component.html',
  styleUrl: './comment-section.component.css'
})
export class CommentSectionComponent {
  @Input() currentUser: Partial<User> = {};
  @Input() episode!: Episode;
  
  options: {
    podcast: PodcastId | null;
    episode: EpisodeId | null;
  } = {
    podcast: null,
    episode: null
  };

  comments: Comment[] = [];

  constructor(private commentService: CommentService) {}

  ngOnInit(): void {
    console.log('episode', this.episode);
    this.loadComments(); // Load comments when the component initializes

    // Listen for new comments being added in real time
    this.commentService.onNewComment().subscribe((newComment: Comment) => {
      // Check if new comment is for the current episode
      if (newComment.episode?.id === this.episode.id) {
        this.comments.push(newComment); // Only add the new comment if it belongs to the current episode
      }
    });
  }

  loadComments(): void {
    // Wrap the episode and podcast id inside their respective objects
    this.options = {
      podcast: { id: this.episode.podcast.id },  // Correct structure for PodcastId
      episode: { id: this.episode.id }           // Correct structure for EpisodeId
    };

    // Call the service to retrieve comments for the specific episode
    this.commentService.getComments(this.options).subscribe((comments: Comment[]) => {
      this.comments = comments;
      console.log('loaded comments', this.comments);
    });
  }

  handleReplySubmit(replyText: string): void {
    const newReply = {
      content: replyText,
      parent: null,  // Adjust this if the reply has a parent comment
      podcast: this.options.podcast,
      episode: this.options.episode,
      user: this.currentUser,
    };

    // Send the new reply to the service
    this.commentService.addComment(newReply);
  }
}