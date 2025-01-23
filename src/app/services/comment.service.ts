import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
import { Comment } from '../interfaces/app.interfaces';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private socket: Socket;

  constructor() {
    // Connect to the WebSocket server
    this.socket = io('http://localhost:8001'); // Update this with your WebSocket URL
  }

  // Emit an event to fetch comments for a specific podcast and episode
  getComments(options: any): Observable<Comment[]> {
    console.log('comments');
    this.socket.emit('comments', options);

    // Return the observable that listens for the 'comments' event
    return this.onComments();
  }

  // Listen for the 'comments' event and return the comments
  onComments(): Observable<any[]> {
    return new Observable((subscriber) => {
      this.socket.on('comments', (data) => {
        subscriber.next(data);
      });
    });
  }

  // Emit an event to add a new comment
  addComment(commentData: any): void {
    console.log('hello');
    this.socket.emit('comment', commentData);
  }

  // Listen for new comments being added
  onNewComment(): Observable<any> {
    return new Observable((subscriber) => {
      this.socket.on('comment', (data) => {
        subscriber.next(data);
      });
    });
  }
}
