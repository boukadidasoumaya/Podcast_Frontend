import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentService } from '../../services/comment.service';
import { Comment, User } from '../../interfaces/app.interfaces';
import { PodcastId, EpisodeId, Episode } from '../../interfaces/app.interfaces';
import { ReplyFormComponent } from "../comment/reply-form/reply-form.component";
import { SectionCustomComponent } from "../section-custom/section-custom.component";
import { UserService } from '../../services/user.service';
import { LikeCommentService } from '../../services/likeComment.service';
import { CommentComponent } from '../comment/comment.component';// import { LikeCommentServiceRest } from '../../services/likeComment-rest.service';

@Component({
  selector: 'app-comment-section',
  standalone: true,
  imports: [CommonModule, CommentComponent, ReplyFormComponent, SectionCustomComponent],
  templateUrl: './comment-section.component.html',
  styleUrl: './comment-section.component.css'
})
export class CommentSectionComponent {
  @Input() episode!: Episode;
  comments: Comment[] = [];
  user: Partial<User> = {};
  options: {
    podcast: PodcastId | null;
    episode: EpisodeId | null;
  } = {
    podcast: null,
    episode: null
  };

  repliesLikedState: { [replyId: number]: boolean } = {};
  repliesLikes: { [replyId: number]: number } = {};

  // Nombre de likes pour chaque commentaire
  likes: { [commentId: number]: number } = {};

  // Track liked state for each comment
  likedComments: { [commentId: number]: boolean } = {};

  private likeSubscription: any;
  private unlikeSubscription: any;

  constructor(
    private commentService: CommentService,
    private userService: UserService,
    private likeCommentService: LikeCommentService,
    // private likeCommentServiceRest: LikeCommentServiceRest
  ) {}

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe((user) => {
      this.user = user;
      console.log('Utilisateur actuel:', this.user);
    });

    this.loadComments();

    // Écouter les nouveaux commentaires
    this.commentService.onNewComment().subscribe((newComment: Comment) => {
      if (newComment.episode?.id === this.episode.id) {
        this.comments.push(newComment);
        this.likes[newComment.id] = newComment.likesCount || 0;
        console.log(this.likes);
      }
    });

    // Écouter les likes en temps réel
    this.likeSubscription = this.likeCommentService.onLikeComment().subscribe((data) => {
      data.totalLikes.forEach((likeData: any) => {
        this.likes[likeData.comment] = likeData.likesCount;
      });
    });

    // Écouter les unlikes en temps réel
    this.unlikeSubscription = this.likeCommentService.onUnlikeComment().subscribe((data) => {
      data.totalLikes.forEach((likeData: any) => {
        this.likes[likeData.comment] = likeData.likesCount;
      });
    });
  }

  ngOnDestroy(): void {
    // Nettoyer les souscriptions
    this.likeSubscription?.unsubscribe();
    this.unlikeSubscription?.unsubscribe();
  }

  loadComments(): void {
    this.options = {
      podcast: { id: this.episode.podcast.id },
      episode: { id: this.episode.id }
    };

    this.commentService.getComments(this.options).subscribe((comments: Comment[]) => {
      this.comments = comments;
      console.log('loaded comments', this.comments);

      // Initialiser le nombre de likes et l'état des likes pour chaque commentaire et ses replies
      this.comments.forEach((comment) => {
        this.likes[comment.id] = comment.likesCount || 0;
        this.likedComments[comment.id] = this.hasUserLiked(comment);
        console.log(this.likedComments);
        // Vérifier aussi les replies si elles existent
        if (comment.replies && comment.replies.length > 0) {
          comment.replies.forEach((reply) => {
            this.likes[reply.id] = reply.likesCount || 0;
            this.likedComments[reply.id] = this.hasUserLiked(reply);
          });
        }
      });
    });
  }

  //  Fonction utilitaire pour vérifier si l'utilisateur a liké un commentaire
  private hasUserLiked(comment: Comment): boolean {
    return Array.isArray(comment.likesComment) &&
      comment.likesComment.some(like => like.user.id === this.user.id);
  }



  handleReplySubmit(replyText: string): void {
    const newReply = {
      content: replyText,
      parent: null,
      podcast: this.options.podcast,
      episode: this.options.episode,
      user: this.user,
    };
    this.commentService.addComment(newReply);
  }

  onLikeChanged(event: { isLiked: boolean, comment: Comment }): void {
    const { isLiked, comment } = event;
    this.likedComments[comment.id] = isLiked;

    if (isLiked) {
      this.likeCommentService.likeComment(this.user, comment);
    } else {
      this.likeCommentService.unlikeComment(this.user, comment);
    }
  }



  // Helper method to check if a comment is liked by the current user
  isCommentLiked(commentId: number): boolean {
    return this.likedComments[commentId] || false;
  }
  deleteComment(comment: Comment, user: Partial<User>): void {
    this.commentService.deleteComment(comment, user).subscribe();
    console.log('Comment deleted successfully');
    this.comments = this.comments.filter((c) => c.id !== comment.id);
    console.log(this.comments);
  }
onReplyLikeChanged(event: { isLiked: boolean, comment: Comment }) {
    const replyId = event.comment.id;
    this.repliesLikedState[replyId] = event.isLiked;
    this.repliesLikes[replyId] = event.isLiked
      ? (this.repliesLikes[replyId] || 0) + 1
      : (this.repliesLikes[replyId] || 1) - 1;
  }

}
