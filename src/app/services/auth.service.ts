import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { TOKEN_KEY } from '../../config/storage.config';
interface RegisterData {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    birthday: string;
    country: string;
    profession: string;
    role: string;
    whatsappUser: string;
    instagramLink: string;
    password: string;
    interests: string[];
  }
  
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
    const transformedData: RegisterData = {
      firstName: data.firstName,
      lastName: data.lastName,
      username: data.username,
      email: data.email,
      birthday: data.birthday,
      country: data.country,
      profession: data.profession,
      role: data.role,
      whatsappUser: data.whatsappUser,
      instagramLink: data.instagramLink,
      password: data.password,
      interests: data.selectedInterests,
    };
    console.log('Register data:', transformedData);
    return this.http.post(`${this.apiUrl}/auth/register`, transformedData);
  }

  login(data: any): Observable<any> {
    const loginData: LoginData = {
      email: data.email,
      password: data.password
    };
    console.log('Sending login data:', loginData);
    return this.http.post(`${this.apiUrl}/auth/login`, loginData);
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

}