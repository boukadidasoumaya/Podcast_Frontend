import { Component, OnInit, Output } from '@angular/core';
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
import { Podcast } from '../../interfaces/app.interfaces';
import { PodcastService } from '../../services/podcast.service';
import { UpdateComponent } from '../update/update.component';
import { UpdateModalComponent } from '../modals/update-modal/update-modal.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [CommonModule,NavbarComponent,SectionCustomComponent,TopicsComponent, EpisodeHorizontalComponent,EmailModalComponent,PasswordModalComponent,SocialMediaModalComponent,UserInfoModalComponent,SwiperComponent,UpdateModalComponent
  ],
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']

})
export class ProfilComponent  implements OnInit {
  user: any = {};
  podcastData: Podcast[] = [];
  isLoading = true;
  error: string | null = null;
  isEditModalOpen:boolean=true;
  constructor(private userService: UserService,private podcastService: PodcastService) {}
  selectedPodcast:Partial<Podcast>={};

  ngOnInit() {
    this.loadUserProfile();
    console.log('user',this.user);
    this.loadUserPodcasts();
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
            instagram: data.instagramLink ,
            twitter: data.twitterLink || 'Not provided'
          }
        };
        this.isLoading = false;
      },
      error: (error) => {
        this.error = 'Failed to load user profile';
        this.isLoading = false;
        console.error('Error loading profile:', error);
      }
    });
  }
  loadUserPodcasts() {
    this.podcastService.getPodcastsByUser().subscribe({
      next: (podcasts) => {
        this.podcastData = podcasts;
        console.log('my podcast',this.podcastData)

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
            twitter: updatedUser.twitterLink || 'Not provided'
          }
        };
      },
      error: (error) => {
        console.error('Error updating profile:', error);
      }
    });
  }
  toggleEditModal(){
    this.isEditModalOpen=!this.isEditModalOpen;
  }
  editPodcast(podcast:Podcast){
    this.isEditModalOpen=true;
    console.log('here from profile',this.isEditModalOpen);

    // this.toggleEditModal;
  }
  deletePodcast(podcast:Podcast){

  }
  onPodcastSelect(podcast: Podcast) {
    this.selectedPodcast = podcast;
    console.log('Selected podcast:', this.selectedPodcast);
  }
  updatePodcast(podcast:Podcast){

  }
  closeEditModal(){
    this.toggleEditModal();
  }
}
