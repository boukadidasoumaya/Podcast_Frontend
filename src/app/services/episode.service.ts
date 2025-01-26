import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Episode } from '../interfaces/app.interfaces'; // Assure-toi que tu as un modèle Episode
import { APP_API } from '../config/app-api.config';

@Injectable({
  providedIn: 'root'
})
export class EpisodeService {
  private apiUrl = APP_API.episode; // URL de ton API backend

  constructor(private http: HttpClient) {}

  // Appel pour créer un nouvel épisode
  createEpisode(createEpisodeDto: any): Observable<Episode> {
    return this.http.post<Episode>(`${this.apiUrl}`, createEpisodeDto);
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
  // Récupérer un épisode par son ID
  getEpisodeById(id: number): Observable<Episode> {
    return this.http.get<Episode>(`${this.apiUrl}/${id}`);
  }

  // Mettre à jour un épisode
  updateEpisode(id: number, updateEpisodeDto: any): Observable<Episode> {
    return this.http.put<Episode>(`${this.apiUrl}/${id}`, updateEpisodeDto);
  }

  // Supprimer un épisode
  deleteEpisode(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Incrémenter les vues d'un épisode
  incrementViews(id: number): Observable<{ message: string; views: number }> {
    return this.http.post<{ message: string; views: number }>(
      `${this.apiUrl}/${id}/views`,
      {}
    );
  }
}
