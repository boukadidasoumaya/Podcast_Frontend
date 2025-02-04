import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Episode, Podcast } from '../interfaces/app.interfaces';

import { CreatePodcast } from '../models/podcast.model';
import { APP_API } from '../config/app-api.config';
@Injectable({
  providedIn: 'root',
})
export class PodcastService {
 private apiUrl = APP_API.podcast;

  constructor(private http: HttpClient) {}

  createPodcast(podcast: CreatePodcast): Observable<CreatePodcast> {
    return this.http.post<CreatePodcast>(this.apiUrl, podcast);
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
  uploadImage(file: File): Observable<{ message: string; filename: string }> {
    const formData = new FormData();
    formData.append('image', file);

    return this.http.post<{ message: string; filename: string }>(
      `${this.apiUrl}/image`,
      formData
    );
  }
}
