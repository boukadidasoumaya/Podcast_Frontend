import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Topic } from "../interfaces/app.interfaces";
import { APP_API, baseUrl } from '../config/app-api.config';

@Injectable({
    providedIn: 'root',
  })
  export class TopicService {
    private apiUrl = APP_API.topics;

    constructor(private http: HttpClient) {}

    getTopicsWithPodcastCount(): Observable<Topic[]> {
      this.http.get<Topic[]>(`${this.apiUrl}/with-podcast-count`).subscribe(
        (data) => {
          console.log('Received data:', data);
        },
        (error) => {
          console.error('Error occurred:', error);
        }
      );

      return this.http.get<Topic[]>(`${this.apiUrl}/with-podcast-count`);
    }
  }
