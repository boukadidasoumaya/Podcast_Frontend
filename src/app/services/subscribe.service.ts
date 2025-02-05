import {  Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APP_API, baseUrl } from '../config/app-api.config';

@Injectable({
  providedIn: 'root'
})
export class SubscribeService {
  private apiUrl = APP_API.subscribeOnPodcast;

  constructor() {}

  subscribe(email: string): Observable<any> {
    return new Observable(observer => {
      fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })
      .then(response => response.json())
      .then(data => {
        observer.next(data);
        observer.complete();
      })
      .catch(error => {
        observer.error(error);
      });
    });
  }

}
