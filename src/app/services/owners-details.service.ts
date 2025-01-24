import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OwnersDetailsService {


  private apiUrl = 'http://localhost:3000/user/owner-details';  

  constructor() { }

  getUsers(): Promise<any[]> {
    return fetch(this.apiUrl)
      .then(response => response.json())
      .then(data => data)
      .catch(error => {
        console.error('Error fetching user data:', error);
        throw error;
      });
  }
}
