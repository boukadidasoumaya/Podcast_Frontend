import { Component, Input } from '@angular/core';
import { SearchComponent } from "./search/search.component";
import { LogoComponent } from "./logo/logo.component";
import { UserProfileComponent } from "./user-profile/user-profile.component";
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../contact/header/header.component";
import { PodcastModalComponent } from "../modals/podcast-modal/podcast-modal.component";
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [SearchComponent, LogoComponent, UserProfileComponent, CommonModule, PodcastModalComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  @Input() text:any="Home";
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
