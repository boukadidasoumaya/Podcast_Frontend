import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Podcast } from '../components/models/podcast.model';
@Injectable({
  providedIn: 'root',
})
export class PodcastService {
  private apiUrl = 'http://localhost:3000/podcast'; 

  constructor(private http: HttpClient) {}

  createPodcast(podcast: Podcast): Observable<Podcast> {
    return this.http.post<Podcast>(this.apiUrl, podcast);
  }
}
