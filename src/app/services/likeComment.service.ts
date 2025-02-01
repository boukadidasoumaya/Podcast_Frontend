import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
import { APP_API } from '../config/app-api.config';
import { Comment, User } from '../interfaces/app.interfaces';

@Injectable({
  providedIn: 'root',
})
export class LikeCommentService {
  private socket: Socket;

  constructor() {
    this.socket = io(APP_API.websocket);
  }

  // Émettre un like pour un commentaire
  likeComment(user: Partial<User>, comment: Comment): void {
    console.log('Liking comment');
    this.socket.emit('likeComment', { user, comment });
  }

  // Émettre un unlike pour un commentaire
  unlikeComment(user: Partial<User>, comment: Comment): void {
    console.log('Unliking comment');
    this.socket.emit('unlikeComment', { user, comment });
  }

  // Observer les nouveaux likes pour un commentaire
  onLikeComment(): Observable<any> {
    return new Observable((subscriber) => {
      this.socket.on('likeComment', (data) => {
        console.log('Like received:', data);
        subscriber.next(data);
      });
    });
  }

  // Observer les nouveaux unlikes pour un commentaire
  onUnlikeComment(): Observable<any> {
    return new Observable((subscriber) => {
      this.socket.on('unlikeComment', (data) => {
        console.log('Unlike received:', data);
        subscriber.next(data);
      });
    });
  }

  // Observer les erreurs
  onError(): Observable<any> {
    return new Observable((subscriber) => {
      this.socket.on('errorMessage', (error) => {
        console.error(error);
        subscriber.next(error);
      });
    });
  }
}
