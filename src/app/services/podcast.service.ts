import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Podcast } from '../models/podcast.model';
import { APP_API } from '../config/app-api.config';
@Injectable({
  providedIn: 'root',
})
export class PodcastService {
 private apiUrl = APP_API.podcast; 

  constructor(private http: HttpClient) {}

  createPodcast(podcast: Podcast): Observable<Podcast> {
    return this.http.post<Podcast>(this.apiUrl, podcast);
  }
}
