import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Podcast, Topic, User } from '../interfaces/app.interfaces';

@Injectable({
  providedIn: 'root'
})
export class FiltreService {

  private url='http://localhost:3000/podcast/filter';
  private url1='http://localhost:3000/user/users';
  private url3='http://localhost:3000/podcast';
  // private url2='http://localhost:3000/topic/topics';


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
    return this.http.get<any>(this.url, { params });
  }

  getAllusers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.url1}`);
  }

  // getAlltopics(): Observable<Topic[]> {
  //   return this.http.get<Topic[]>(`${this.url2}`);
  // }

}

