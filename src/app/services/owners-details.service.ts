import { Injectable } from '@angular/core';
import { Owner } from '../interfaces/app.interfaces';
import { APP_API, baseUrl } from '../config/app-api.config';


@Injectable({
  providedIn: 'root'
})
export class OwnersDetailsService {


  private apiUrl =APP_API.owner;

  constructor() { }

  async getUsers(): Promise<Owner[]> {
    try {
      const response = await fetch(this.apiUrl);
      const data = await response.json();
      console.log('API response:', data);

      // Normalize the response to an array
      return Array.isArray(data) ? data : data ? [data] : [];
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw error;
    }
  }

}
