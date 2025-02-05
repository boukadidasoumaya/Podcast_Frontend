import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Contact, User } from '../interfaces/app.interfaces';
import { APP_API, baseUrl } from '../config/app-api.config';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl =APP_API.user ;
  private  baseUrl=baseUrl;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  getUserProfile(): Observable<any> {
    return this.http.get(`${this.apiUrl}/profile`);
  }

  updateUserProfile(userData: any): Observable<any> {
    console.log(userData);
    return this.http.put(`${this.apiUrl}/profile`, userData);
  }

  updatePassword(passwordData: { oldPassword: string; newPassword: string }): Observable<any> {
    return this.http.put(
      `${this.apiUrl}/change-password`, passwordData
    );
  }
  updateEmail(emailData: { oldEmail: string; newEmail: string }): Observable<any> {
    return this.http.put(`${this.apiUrl}/update-email`, emailData);
  }

  updateToken(email: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/update-token`, { email });
  }
  getCurrentUser(): Observable<Partial<User>> {
    return this.http.get(`${this.apiUrl}/current-user`);
  }
  sendMailContact(contactData: Contact): Observable<any> {
    return this.http.post(`${this.apiUrl}/contact`, contactData);
  }
  uploadImage(file: File): Observable<{ message: string; filename: string }> {
    const formData = new FormData();
    formData.append('photo', file);

    return this.http.post<{ message: string; filename: string }>(
      `${this.apiUrl}/photo`,
      formData
    );
  }
}
