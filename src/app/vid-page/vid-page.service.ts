import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EpisodeService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getEpisodeById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/episodes/${id}`);
  }

  getRelatedEpisodes(id: string, podcastId: string): Observable<any[]> {
    console.log( this.http.get<any[]>(`${this.apiUrl}/podcast/${podcastId}/episodes`));
    return this.http.get<any[]>(`${this.apiUrl}/podcast/${podcastId}/episodes`);
  }

  getComments(id: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/episodes/${id}/comments`);
  }
}
