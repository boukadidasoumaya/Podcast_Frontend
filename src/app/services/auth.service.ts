import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


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

  constructor(private http: HttpClient) {}

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
      password: data.password
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
}