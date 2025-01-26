import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Episode } from '../models/episode.model';
@Injectable({
  providedIn: 'root',
})
export class EpisodeService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getEpisodeById(id: number): Observable<Episode> {
    console.log('hhhjj')
    console.log(this.http.get<Episode>(`${this.apiUrl}/episodes/${id}`))
    return this.http.get<Episode>(`${this.apiUrl}/episodes/${id}`);
  }
  
  getRelatedEpisodes(podcastId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/podcast/${podcastId}/episodes`);
  }

  getComments(id: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/episodes/${id}/comments`);
  }
}
