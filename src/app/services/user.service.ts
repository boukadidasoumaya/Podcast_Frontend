import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { User } from '../interfaces/app.interfaces';

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
  updateEmail(emailData: { oldEmail: string; newEmail: string }): Observable<any> {
    return this.http.put(`${this.apiUrl}/user/update-email`, emailData);
  }

  updateToken(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/update-token`, { email });
  }
  getCurrentUser(): Observable<Partial<User>> {
    return this.http.get(`${this.apiUrl}/user/current-user`);
  }
}
