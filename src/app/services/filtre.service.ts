import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Podcast } from '../interfaces/app.interfaces';

@Injectable({
  providedIn: 'root'
})
export class FiltreService {

  private apiUrl = 'http://localhost:3000/podcasts';

  constructor(private http: HttpClient) {}


  getFilteredPodcasts(filters: any): Observable<any> {
    let params = new HttpParams();
    Object.keys(filters).forEach(key => {
      if (filters[key]) {
        params = params.set(key, filters[key]);
      }
    });
    return this.http.get<any>(this.apiUrl, { params });
  }

  getAllpodcasts(): Observable<Podcast[]> {
    return this.http.get<Podcast[]>(`${this.apiUrl}`);
  }



}
