import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PodcastS } from '..//models/episode.model';
import { Episode, Podcast } from '../interfaces/app.interfaces';

@Injectable({
  providedIn: 'root',
})
export class PodcastService {
  private apiUrl = 'http://localhost:3000/podcast';

  constructor(private http: HttpClient) {}

  createPodcast(podcast: PodcastS): Observable<PodcastS> {
    return this.http.post<PodcastS>(this.apiUrl, podcast);
  }
  getPodcastsByUser():Observable<Podcast[]>{
    return this.http.get<Podcast[]>(`${this.apiUrl}/user`)
  }
  getFirstEpisode(podcastId: number): Observable<Episode> {
    return this.http.get<Episode>(`${this.apiUrl}/${podcastId}/first-episode`);
  }
  updatePodcast(id:number,podcast:Partial<Podcast>):Observable<Podcast>{
    return this.http.patch<Podcast>(`${this.apiUrl}/${id}`,podcast)
  }
  deletePodcast(id:number){
    return this.http.delete<Number>(`${this.apiUrl}/${id}`)
  }
}
