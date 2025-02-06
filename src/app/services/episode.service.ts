import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Episode, Podcast,subscriptionPodcast } from '../interfaces/app.interfaces'; // Assure-toi que tu as un modèle Episode
import { APP_API, baseUrl } from '../config/app-api.config';
import { CreateEpisode } from '../models/podcast.model';
@Injectable({
  providedIn: 'root'
})
export class EpisodeService {
  private apiUrl = APP_API.episode;

  constructor(private http: HttpClient) {}

  createEpisode(episode: CreateEpisode): Observable<CreateEpisode> {
    return this.http.post<CreateEpisode>(this.apiUrl, episode);
  }


  // Récupérer tous les épisodes
  getAllEpisodes(): Observable<Episode[]> {
    return this.http.get<Episode[]>(`${this.apiUrl}`);
  }
 // Fetch trending episodes
  getAllEpisodesTrending(): Observable<Episode[]> {
  return this.http.get<Episode[]>(`${this.apiUrl}/trending`);
  }

// Fetch latest episodes
  getAllEpisodesLatest(): Observable<Episode[]> {
  return this.http.get<Episode[]>(`${this.apiUrl}/latest`);
  }


  // Mettre à jour un épisode
  updateEpisode(id: number, updateEpisodeDto: Partial<Episode>): Observable<Partial<Episode>> {
    return this.http.put<Episode>(`${this.apiUrl}/${id}`, updateEpisodeDto);
  }

  // Supprimer un épisode
  deleteEpisode(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Incrémenter les vues d'un épisode
 
  
  getEpisodeById(id: number): Observable<Episode> {
    console.log('hhhjj')
    console.log(this.http.get<Episode>(`${this.apiUrl}/${id}`))
    return this.http.get<Episode>(`${this.apiUrl}/${id}`);
  }

  getRelatedEpisodes(podcastId: number): Observable<Episode[]> {
    return this.http.get<Episode[]>(`${baseUrl}podcast/${podcastId}/episodes`);
  }
  //subscription
  subscription(podcast: subscriptionPodcast) : Observable<{ message: string }>{
    return this.http.post<{ message: string }>(
      'http://localhost:3000/subscription/subscribe',
      podcast
    );

  }

  //unsubscription
  unsubscription(podcast: subscriptionPodcast): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(
      'http://localhost:3000/subscription/unsubscribe',
      podcast
    );
  }
  uploadImage(file: File): Observable<{ message: string; filename: string }> {
    const formData = new FormData();
    formData.append('coverImage', file);

    return this.http.post<{ message: string; filename: string }>(
      `${this.apiUrl}/coverImage`,
      formData
    );
  }
  uploadVideo(file: File): Observable<{ message: string; filename: string }> {
    const formData = new FormData();
    formData.append('filepath', file);

    return this.http.post<{ message: string; filename: string }>(
      `${this.apiUrl}/filepath`,
      formData
    );
  }
}
