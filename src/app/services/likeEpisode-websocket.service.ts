import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
import { APP_API } from '../config/app-api.config';
import { Episode, User } from '../interfaces/app.interfaces';

@Injectable({
  providedIn: 'root',
})
export class LikeEpisodeService {
  private socket: Socket;

  constructor() {
    this.socket = io(APP_API.websocket);
  }

  // Émettre un like pour un épisode
  likeEpisode(user: Partial<User>, episode:Episode): void {
    console.log('Liking episode');
    this.socket.emit('likeEpisode', { user,episode });
  }

  // Émettre un unlike pour un épisode
  unlikeEpisode(user: Partial<User>, episode:Episode): void {
    console.log('Unliking episode');
    this.socket.emit('unlikeEpisode', { user,episode });
  }

  // Observer les nouveaux likes pour un épisode
  onLikeEpisode(): Observable<any> {
    return new Observable((subscriber) => {
      this.socket.on('likeEpisode', (data) => {
        console.log('Like received:', data);
        subscriber.next(data);
      });
    });
  }

  // Observer les nouveaux unlikes pour un épisode
  onUnlikeEpisode(): Observable<any> {
    return new Observable((subscriber) => {
      this.socket.on('unlikeEpisode', (data) => {
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
