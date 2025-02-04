import { UserService } from './../../services/user.service';
import { Component, Input } from '@angular/core';
import { SearchComponent } from "./search/search.component";
import { LogoComponent } from "./logo/logo.component";
import { UserProfileComponent } from "./user-profile/user-profile.component";
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../contact/header/header.component";
import { PodcastModalComponent } from "../modals/podcast-modal/podcast-modal.component";
import { RouterModule } from '@angular/router';
import { User } from '../../interfaces/app.interfaces';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [SearchComponent, LogoComponent, UserProfileComponent, CommonModule, PodcastModalComponent, HeaderComponent,RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  user: Partial<User> = {};
  

  constructor(private userService:UserService){}
  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe((user) => {
      this.user = user;
    });
    console.log("current user",this.user);

  }
  handleSearch(searchTerm: string): void {
    console.log('Search term from search component:', searchTerm);
  }

  isToggled: boolean = false;

  toggleNavbar() {
    this.isToggled = !this.isToggled;
  }
  dropdownOpen = false;

  toggleDropdown(event: Event) {
    event.stopPropagation();
    this.dropdownOpen = !this.dropdownOpen;
  }
}
