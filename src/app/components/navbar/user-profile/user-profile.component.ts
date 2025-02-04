import { User } from './../../../interfaces/app.interfaces';
import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { UserService } from '../../../services/user.service';
import Dropdown from 'bootstrap/js/dist/dropdown';
@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, RouterModule],
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
  ngAfterViewInit(): void {
    const dropdownElement = document.getElementById('userDropdown');
    if (dropdownElement) {
      new Dropdown(dropdownElement);
    }
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