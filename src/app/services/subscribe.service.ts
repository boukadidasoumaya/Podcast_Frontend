import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubscribeService {
  private apiUrl = 'http://localhost:3000/subscribe'; 

  constructor(private http: HttpClient) {}

  subscribe(email: string): Observable<any> {
    return this.http.post(this.apiUrl, { email });
  }
  
}
