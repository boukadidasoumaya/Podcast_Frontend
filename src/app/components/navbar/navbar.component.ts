import { Component } from '@angular/core';
import { SearchComponent } from "./search/search.component";
import { LogoComponent } from "./logo/logo.component";
import { UserProfileComponent } from "./user-profile/user-profile.component";
import { UploadPodcastComponent } from './upload-modal/upload-podcast/upload-podcast.component';
import { UploadModalComponent } from "./upload-modal/upload-modal.component";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [SearchComponent, LogoComponent, UserProfileComponent, UploadPodcastComponent, UploadModalComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  handleSearch(searchTerm: string): void {
    console.log('Search term from search component:', searchTerm);
  }

}
