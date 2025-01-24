import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
import { Comment } from '../interfaces/app.interfaces';
import { APP_API } from "../config/app-api.config";

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private socket: Socket;

  constructor() {
    this.socket = io(APP_API.comments);
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
}
