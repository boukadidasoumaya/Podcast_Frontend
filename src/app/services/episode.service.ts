import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Episode } from '../components/models/podcast.model';
@Injectable({
  providedIn: 'root',
})
export class EpisodeService {
  private apiUrl = 'http://localhost:3000/episodes';  

  constructor(private http: HttpClient) {}

  createEpisode(episode: Episode): Observable<Episode> {
    return this.http.post<Episode>(this.apiUrl, episode);
  }
}
