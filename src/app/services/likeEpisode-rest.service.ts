import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Episode } from '../interfaces/app.interfaces';
import { APP_API } from '../config/app-api.config';

@Injectable({
  providedIn: 'root',
})
export class LikeEpisodeServiceRest {

  constructor(private http: HttpClient) {}

  getLikedEpisodesByUser(): Observable<Episode[]> {
    return this.http.get<Episode[]>(APP_API.likeEpisode);
  }
}
