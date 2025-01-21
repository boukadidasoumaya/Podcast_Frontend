import { Component } from '@angular/core';
import { SearchComponent } from "./search/search.component";
import { LogoComponent } from "./logo/logo.component";
import { UserProfileComponent } from "./user-profile/user-profile.component";
import { UploadModalComponent } from "./upload-modal/upload-modal.component";
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [SearchComponent, LogoComponent, UserProfileComponent,  UploadModalComponent,CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  handleSearch(searchTerm: string): void {
    console.log('Search term from search component:', searchTerm);
  }

  isToggled: boolean = false;

  toggleNavbar() {
    this.isToggled = !this.isToggled;
  }

}
