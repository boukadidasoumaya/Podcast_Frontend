import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000'; 

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  getUserProfile(): Observable<any> {
    return this.http.get(`${this.apiUrl}/user/profile`);
  }

  updateUserProfile(userData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/user/profile`, userData);
  }

  updatePassword(passwordData: { oldPassword: string; newPassword: string }): Observable<any> {
    return this.http.put(
      `${this.apiUrl}/user/change-password`, passwordData
    );
  }
  updateEmail(emailData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/user/update-email`, emailData);
  }
}