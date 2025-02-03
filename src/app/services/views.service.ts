import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: Socket;
  constructor(private http: HttpClient) {
    this.socket = io('http://localhost:8001' , {
      path: '',  // Ensure this matches your backend
    });

  this.socket.on('connect', () => {
    console.log('Connected to WebSocket server');
  });

  this.socket.on('disconnect', () => {
    console.log('Disconnected from WebSocket server');
  });

  this.socket.on('viewUpdate', (data: any) => {
    console.log('View count updated:', data);
  });
  }
  // Listen for view updates
  onViewUpdate(): Observable<{ id: number; views: number }> {
    return new Observable(observer => {
      this.socket.on('viewUpdate', data => {
        observer.next(data);
      });
    });
  }
  sendViewUpdate(episodeId: number) {
    console.log('kkkkkkkkkkkkkkkkkkkkk')
    this.socket.emit('viewUpdate', { id: episodeId });
  }
  // Emit an event if needed
  sendMessage(event: string, data: any) {
    this.socket.emit(event, data);
  }
}
