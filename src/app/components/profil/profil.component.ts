import { Component, OnInit } from '@angular/core';
import { EmailModalComponent } from '../modals/email-modal/email-modal.component';
import { PasswordModalComponent } from '../modals/password-modal/password-modal.component';
import { SocialMediaModalComponent } from '../modals/social-media-modal/social-media-modal.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { UserInfoModalComponent } from '../modals/user-info-modal/user-info-modal/user-info-modal.component';
import { SwiperComponent } from '../swiper/swiper.component';
import { TopicsComponent } from '../topics/topics.component';
import { EpisodeHorizontalComponent } from '../episode-horizontal/episode-horizontal.component';
import { SectionCustomComponent } from '../section-custom/section-custom.component';
import { UserService } from '../../services/user.service';
import { Episode } from '../../interfaces/app.interfaces';
import { BookmarkService } from '../../services/bookmark.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [NavbarComponent,CommonModule,SectionCustomComponent, EpisodeHorizontalComponent,EmailModalComponent,PasswordModalComponent,SocialMediaModalComponent,UserInfoModalComponent,SwiperComponent,TopicsComponent
  ],
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']

})
export class ProfilComponent  implements OnInit {
  user: any = {};
  podcastData: any[] = [];
  isLoading = true;
  error: string | null = null;
  bookmarkedEpisodes: Episode[] = [];

  constructor(private userService: UserService, private bookmarkService: BookmarkService) {}

  ngOnInit() {
    this.fetchBookmarkedEpisodes(1); // Assuming user ID is 1
  }

  fetchBookmarkedEpisodes(userId: number) {
    this.bookmarkService.getBookmarkedEpisodes(userId).subscribe(
      (episodes: Episode[]) => {
        this.bookmarkedEpisodes = episodes;
        console.log('nhhhhhhhhhhhhh')
        console.log(this.bookmarkedEpisodes)

      },
      (error: any) => { // Explicitly typing the 'error' parameter as 'any'
        console.error('Error fetching bookmarked episodes:', error);
      }
    );

  }
  handleLike(event: { isLiked: boolean, episode: Episode }) {
    console.log('Liked:', event.isLiked, 'Episode:', event.episode);
  }
  

  loadUserProfile() {
    this.isLoading = true;
    this.userService.getUserProfile().subscribe({
      next: (data) => {
        this.user = {
          ...data,
          profilImage: data.profileImage || 'assets/images/default-profile.png',
          name: `${data.firstName} ${data.lastName}`,
          password: data.password,
          birthDate: new Date(data.birthday).toLocaleDateString(),
          address: data.country,
          profession: data.profession,
          email: data.email,
          socialMedia: {
            whatsapp: data.whatsappUser,
            instagram: data.instagramLink,
            twitter: data.twitterLink || 'Not provided',
          },
        };
        this.isLoading = false;
      },
      error: (error: any) => { // Explicitly typing the 'error' parameter as 'any'
        this.error = 'Failed to load user profile';
        this.isLoading = false;
        console.error('Error loading profile:', error);
      },
    });
  }

  updateUserPersonnalInfo = (userData: any) => {
    this.userService.updateUserProfile(userData).subscribe({
      next: (updatedUser) => {
        this.user = {
          ...updatedUser,
          profilImage: updatedUser.profileImage || 'assets/images/default-profile.png',
          name: `${updatedUser.firstName} ${updatedUser.lastName}`,
          birthDate: new Date(updatedUser.birthday).toLocaleDateString(),
          address: updatedUser.country,
          job: updatedUser.profession,
          socialMedia: {
            whatsapp: updatedUser.whatsappUser,
            instagram: updatedUser.instagramLink,
            twitter: updatedUser.twitterLink || 'Not provided',
          },
        };
      },
      error: (error: any) => {
        console.error('Error updating profile:', error);
      },
    });
  };
}