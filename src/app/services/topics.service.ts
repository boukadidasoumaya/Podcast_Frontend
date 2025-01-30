import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Topic } from "../interfaces/app.interfaces";
@Injectable({
    providedIn: 'root',
  })
  export class TopicService {
    private apiUrl = 'http://localhost:3000';

    constructor(private http: HttpClient) {}
  
    // Fetch topics from backend
    getTopicsWithPodcastCount(): Observable<Topic[]> {
      console.log('bbbbbbbbbbbbbbbbbbbbbb'); // Log before making the API call
      // Subscribing to the observable to log the result when it comes back
      this.http.get<Topic[]>(`${this.apiUrl}/topics/with-podcast-count`).subscribe(
        (data) => {
          console.log('Received data:', data);  // Log the data received from the API
        },
        (error) => {
          console.error('Error occurred:', error);  // Log any errors
        }
      );
    
      // Return the observable for further handling if needed
      return this.http.get<Topic[]>(`${this.apiUrl}/topics/with-podcast-count`);
    }
  }