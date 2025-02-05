import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Episode } from '../interfaces/app.interfaces';
import { APP_API } from '../config/app-api.config';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  constructor(private http: HttpClient) {}

  getsubscribedEpisodesByUser(): Observable<Episode[]> {
      return this.http.get<Episode[]>(APP_API.subscription);
    }
}
