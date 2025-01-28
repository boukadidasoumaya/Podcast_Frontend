import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
import { Comment, User } from '../interfaces/app.interfaces';
import { APP_API } from "../config/app-api.config";

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private socket: Socket;

  constructor() {
    this.socket = io(APP_API.websocket);
  }

  getComments(options: any): Observable<Comment[]> {
    console.log('comments');
    this.socket.emit('comments', options);

    return this.onComments();
  }

  onComments(): Observable<any[]> {
    return new Observable((subscriber) => {
      this.socket.on('comments', (data) => {
        subscriber.next(data);
      });
    });
  }

  addComment(commentData: any): void {
    console.log('hello');
    this.socket.emit('comment', commentData);
  }

  onNewComment(): Observable<any> {
    return new Observable((subscriber) => {
      this.socket.on('comment', (data) => {
        subscriber.next(data);
      });
    });
  }
  deleteComment(comment: Comment, user: Partial<User>): Observable<void> {
    return new Observable((subscriber) => {
      console.log('Deleting comment with ID:', comment.id);
      this.socket.emit('deleteComment', { comment, user });
    });
  }


  onCommentDeleted(): Observable<string> {
    return new Observable((subscriber) => {
      this.socket.on('commentDeleted', (deletedCommentId: string) => {
        subscriber.next(deletedCommentId);
      });

      return () => {
        this.socket.off('commentDeleted');
      };
    });
  }

}
