import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APP_API, baseUrl } from '../config/app-api.config';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private apiUrl =APP_API.countries ;

  constructor(private http: HttpClient) {}

  getCountries(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
