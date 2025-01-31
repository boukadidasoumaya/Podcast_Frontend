import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Episode } from '../interfaces/app.interfaces';
@Injectable({
  providedIn: 'root'
})
export class BookmarkService {
  private baseUrl = 'http://localhost:3000/bookmarks';

  constructor(private http: HttpClient) {}

  isBookmarked(userId: number, episodeId: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/${userId}/${episodeId}`);
  }

  addBookmark(userId: number, episodeId: number): Observable<any> {
    console.log('yes');

    return this.http.post(`${this.baseUrl}/${userId}/${episodeId}`,null);
  }

  removeBookmark(userId: number, episodeId: number): Observable<any> {
    console.log('no');
    return this.http.delete(`${this.baseUrl}/${userId}/${episodeId}`);
  }
  getBookmarkedEpisodes(userId: number): Observable<Episode[]> {
    return this.http.get<Episode[]>(`${this.baseUrl}/user/${userId}`);
  }
}
