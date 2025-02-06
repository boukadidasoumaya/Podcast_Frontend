import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { TOKEN_KEY } from '../../config/storage.config';
import { APP_API, baseUrl } from '../config/app-api.config';


  interface LoginData {
    email: string;
    password: string;
  }

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000';
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(this.getUserFromLocalStorage());
    this.currentUser = this.currentUserSubject.asObservable();
  }

   register(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/register`, data);
  }

  login(data: any): Observable<any> {
    const loginData: LoginData = {
      email: data.email,
      password: data.password
    };
    return this.http.post(`${this.apiUrl}/auth/login`, loginData).pipe(
      catchError((error: HttpErrorResponse) => {
        const errorMessage = error.error.message ;
        console.log('Backend Error:', errorMessage);
        return throwError(() => new Error(errorMessage));
      })
    );

  }

  getCurrentUser(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/auth/me`);
  }

  checkUsernameUnique(username: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/auth/check-username?username=${username}`);
  }

  checkEmailUnique(email: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/auth/check-email?email=${email}`);
  }

  private parseJwt(token: string) {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      return JSON.parse(window.atob(base64));
    } catch (e) {
      return null;
    }
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  private getUserFromLocalStorage() {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      return this.parseJwt(token);
    }
    return null;
  }


  public get currentUserValue() {
    return this.currentUserSubject.value;
  }



  logout() {
    localStorage.removeItem(TOKEN_KEY);
    this.currentUserSubject.next(null);
  }
  // Forgot Password - Initiate password reset
  forgotPassword(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/forgot-password`, { email });
  }

  // Verify Reset Code - Check if the code is valid
  verifyResetCode(email: string, code: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/verify-reset-code`, { email, code }).pipe(
      tap(response => {
        console.log('Réponse du backend (Verify Code) :', response);
      })
    );
  }

  // Reset Password - Reset the user's password
  resetPassword(email: string, newPassword: string, code: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/reset-password`, { email, newPassword, code });
  }

}
