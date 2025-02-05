import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Episode } from '../interfaces/app.interfaces';
import { APP_API, baseUrl } from '../config/app-api.config';

@Injectable({
  providedIn: 'root'
})
export class BookmarkService {
  private baseUrl = APP_API.bookmarks;

  constructor(private http: HttpClient) {}

  isBookmarked( episodeId: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/${episodeId}`);
  }

  addBookmark( episodeId: number): Observable<any> {
    console.log('yes');

    return this.http.post(`${this.baseUrl}/${episodeId}`,null);
  }

  removeBookmark( episodeId: number): Observable<any> {
    console.log('no');
    return this.http.delete(`${this.baseUrl}/${episodeId}`);
  }
  getBookmarkedEpisodes(): Observable<Episode[]> {
    return this.http.get<Episode[]>(`${this.baseUrl}/user`);
  }
}
