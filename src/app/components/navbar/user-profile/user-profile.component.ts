import { User } from './../../../interfaces/app.interfaces';
import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';


import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { UserService } from '../../../services/user.service';
@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, MatMenuModule, MatIconModule,RouterModule,MatDividerModule,MatButtonModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {
  user: Partial<User> = {};

  constructor(private userService: UserService,private router: Router,private authService: AuthService) {}

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe((user) => {
      this.user = user;
    });
    console.log("current user",this.user);

  }
  viewProfile() {
  
    this.router.navigate(['profil']);
  }
  logout(): void {
    this.authService.logout(); 
    this.router.navigate(['']).then(() => {
      window.location.reload();
    });
     
  }

}
