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
  isEditModalOpen:boolean=false;
  constructor(private userService: UserService,private podcastService: PodcastService, private router: Router,private bookmarkService: BookmarkService,private store: Store<AppState>) {}
  selectedPodcast:Partial<Podcast>={};

  ngOnInit() {
    this.fetchBookmarkedEpisodes(1);
    this.loadUserProfile();
    console.log('user',this.user);
    this.loadUserPodcasts();
   } // Assuming user ID is 1
 

  fetchBookmarkedEpisodes(userId: number) {
    this.bookmarkService.getBookmarkedEpisodes(userId).subscribe(
      (episodes: Episode[]) => {
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
            twitter: updatedUser.twitterUser || 'Not provided'
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
  editPodcastModalOpen(podcast:Podcast){
    this.isEditModalOpen=true;
    console.log('here from profile',this.isEditModalOpen);
  }

  deletePodcast(podcast: Podcast) {
    if (!podcast.id) {
      console.error("Impossible de supprimer : ID du podcast manquant.");
      return;
    }

    this.podcastService.deletePodcast(podcast.id).subscribe({
      next: () => {
        console.log("Podcast supprimé avec succès :", podcast.id);

        // Supprimer le podcast de la liste locale
        this.podcastData = this.podcastData.filter(p => p.id !== podcast.id);
      },
      error: (error) => {
        console.error("Erreur lors de la suppression du podcast :", error);
      }
    });
  }

  onPodcastSelect(podcast: Podcast) {
    this.selectedPodcast = podcast;
    console.log('Selected podcast:', this.selectedPodcast);
  }
  updatePodcast(updatedPodcast: Partial<Podcast>) {
    if (!this.selectedPodcast.id) {
      console.error("Aucun podcast sélectionné pour la mise à jour.");
      return;
    }

    this.podcastService.updatePodcast(this.selectedPodcast.id, updatedPodcast).subscribe({
      next: (response) => {
        console.log("Podcast mis à jour avec succès :", response);

        // Mettre à jour la liste locale des podcasts pour refléter les changements
        this.podcastData = this.podcastData.map(podcast =>
          podcast.id === this.selectedPodcast.id ? { ...podcast, ...updatedPodcast } : podcast
        );

        // Fermer le modal après mise à jour
        this.closeEditModal();
      },
      error: (error) => {
        console.error("Erreur lors de la mise à jour du podcast :", error);
      }
    });
  }

  closeEditModal(){
    this.toggleEditModal();
  }
  goToDetails(podcastId: number) {
    this.podcastService.getFirstEpisode(podcastId).subscribe({
      next: (episode) => {
        if (episode) {
          this.router.navigate([`/details-podcast/${episode.id}`]);
        } else {
          console.error("Aucun épisode trouvé.");
        }
      },
      error: (err) => console.error("Erreur lors de la récupération de l'épisode :", err),
    });
  }
  onCheckDetails(podcast:Podcast) {
    this.goToDetails(podcast.id);
  }


}