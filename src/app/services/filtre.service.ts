import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Podcast, Topic, User } from '../interfaces/app.interfaces';
import { APP_API, baseUrl } from '../config/app-api.config';

@Injectable({
  providedIn: 'root'
})
export class FiltreService {

  private url=APP_API.podcast+'/filter';
  private url1=APP_API.user+'/users';
  private url3=APP_API.podcast+'/reset';


  constructor(private http: HttpClient) {}

  getAllpodcasts(): Observable<Podcast[]> {
    return this.http.get<Podcast[]>(`${this.url3}`);
  }

  getFilteredPodcasts(filters: any): Observable<any> {
    let params = new HttpParams();
    Object.keys(filters).forEach(key => {
      if (filters[key]) {
        params = params.set(key, filters[key]);
      }
    });
    return this.http.get<Podcast[]>(this.url, { params });
  }

  getAllusers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.url1}`);
  }
}

