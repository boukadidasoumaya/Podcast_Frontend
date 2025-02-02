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
import { Store } from '@ngrx/store';
import { selectUser,selectAuthState  } from '../../store/auth/auth.selectors';
import { AuthState } from '../../store/auth/auth.state';

interface AppState {
  auth: AuthState;
}

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [NavbarComponent,SectionCustomComponent, EpisodeHorizontalComponent,EmailModalComponent,PasswordModalComponent,SocialMediaModalComponent,UserInfoModalComponent,SwiperComponent
  ],
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']

})
export class ProfilComponent  implements OnInit {
  user: any = {};
  podcastData: any[] = [];
  isLoading = true;
  error: string | null = null;

  constructor(private userService: UserService, private store: Store<AppState>) {}

  ngOnInit() {
    this.loadUserProfile();
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
      }
      this.isLoading = false;
    },
    error: (error) => {
      this.error = 'Failed to load user profile';
      this.isLoading = false;
      console.error('Error loading profile:', error);
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
  }
}
