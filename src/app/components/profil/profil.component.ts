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
import { Podcast } from '../../interfaces/app.interfaces';
import { PodcastService } from '../../services/podcast.service';
import { UpdateComponent } from '../update/update.component';
import { UpdateModalComponent } from '../modals/update-modal/update-modal.component';
import { CommonModule } from '@angular/common';
import { UpdatePodcastModalComponent } from '../modals/update-podcast-modal/update-podcast-modal.component';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthState } from '../../store/auth/auth.state';
import { selectUser,selectAuthState  } from '../../store/auth/auth.selectors';

interface AppState {
  auth: AuthState;
}

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [CommonModule,NavbarComponent,SectionCustomComponent,TopicsComponent, EpisodeHorizontalComponent,EmailModalComponent,PasswordModalComponent,SocialMediaModalComponent,UserInfoModalComponent,SwiperComponent,UpdatePodcastModalComponent
  ],
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']

})
export class ProfilComponent  implements OnInit {
  user: any = {};
  podcastData: Podcast[] = [];
  isLoading = true;
  error: string | null = null;
  bookmarkedEpisodes: Episode[] = [];
  likes: { [episodeId: number]: number } = {};

  constructor(private userService: UserService, private bookmarkService: BookmarkService) {}

  ngOnInit() {
    this.fetchBookmarkedEpisodes(); 
  }
  onSwiperChange() {
    console.log("Swiper changed");
  }
  fetchBookmarkedEpisodes() {
    this.bookmarkService.getBookmarkedEpisodes().subscribe({
      next: (episodes: Episode[]) => {
        this.bookmarkedEpisodes = episodes;
        console.log('nhhhhhhhhhhhhh')
        console.log(this.bookmarkedEpisodes.length)

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
    this.store.select(selectUser).subscribe({

    next: (user) => {
      console.log(user);
      if (user) {
        this.user = {
          ...user,
          profilImage: user.photo || 'assets/images/default-profile.png',
          name: `${user.firstName} ${user.lastName}`,
          birthDate: new Date(user.birthday).toLocaleDateString(),
          address: user.country,
          profession: user.profession,
          email: user.email,
          socialMedia: {
            whatsapp: user.whatsappUser,
            instagram: user.instagramLink,
            twitter: user.twitterUser || 'Not provided'
          }
        };
        this.isLoading = false;
      },
      error: (error: any) => { // Explicitly typing the 'error' parameter as 'any'
        this.error = 'Failed to load user profile';
        this.isLoading = false;
        console.error('Error loading profile:', error);
      },
      error: (error) => {
        console.error('Error fetching user podcasts:', error);
        this.error = 'Failed to load podcasts';
      }
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
            twitter: updatedUser.twitterUser || 'Not provided'
          }
        };
      },
      error: (error) => {
        console.error('Error updating profile:', error);
      }
    });
  };
  
}