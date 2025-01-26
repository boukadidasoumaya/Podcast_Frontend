import { Component } from '@angular/core';
import { CommentComponent } from '../components/comment/comment.component';
import { Socket } from 'ngx-socket-io';
import { Input } from '@angular/core';
@Component({
  selector: 'app-commentsection',
  standalone: true,
  imports: [CommentComponent],
  templateUrl: './commentsection.component.html',
  styleUrl: './commentsection.component.css'
})
export class CommentsectionComponent {

  @Input() episodeId: string; // Accept the episode ID as input
  comments: any[] = []; // Store fetched comments

  constructor(private socket: Socket) {}

  ngOnInit(): void {
    // Emit the event to fetch comments for the episode
    this.socket.emit('comments', { episodeId: this.episodeId });

    // Listen for the 'comments' event to receive data
    this.socket.on('comments', (data: any[]) => {
      this.comments = data;
    });

    // Handle error messages
    this.socket.on('errorMessage', (message: string) => {
      console.error(message);
    });
  }
}