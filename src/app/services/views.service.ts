// src/app/services/view-count.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ViewCountService {
  private apiUrl = 'http://localhost:3000/episodes'; // Base URL for episodes API

  constructor(private http: HttpClient) {}

  incrementView(episodeId: number): Observable<any> {
    const url = `${this.apiUrl}/${episodeId}/views`; // Construct the full URL
    return this.http.post(url, {}); // Sending an empty body
  }
}
