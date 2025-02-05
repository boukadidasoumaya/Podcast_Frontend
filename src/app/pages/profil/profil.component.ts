import { ChangeDetectorRef, Component, OnInit, Output } from '@angular/core';

import { UserService } from '../../services/user.service';
import { Episode } from '../../interfaces/app.interfaces';
import { BookmarkService } from '../../services/bookmark.service';
import { Podcast } from '../../interfaces/app.interfaces';
import { PodcastService } from '../../services/podcast.service';

import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthState } from '../../store/auth/auth.state';
import { selectUser,selectAuthState  } from '../../store/auth/auth.selectors';
import { updateUserFailure } from '../../store/auth/auth.actions';
import { FooterComponent } from '../../components/footer/footer.component';
import { EpisodeHorizontalComponent } from '../../components/episode-horizontal/episode-horizontal.component';
import { EmailModalComponent } from '../../components/modals/email-modal/email-modal.component';
import { PasswordModalComponent } from '../../components/modals/password-modal/password-modal.component';
import { SocialMediaModalComponent } from '../../components/modals/social-media-modal/social-media-modal.component';
import { UpdatePodcastModalComponent } from '../../components/modals/update-podcast-modal/update-podcast-modal.component';
import { UserInfoModalComponent } from '../../components/modals/user-info-modal/user-info-modal/user-info-modal.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { SectionCustomComponent } from '../../components/section-custom/section-custom.component';
import { SwiperComponent } from '../../components/swiper/swiper.component';
import { TopicsComponent } from '../../components/topics/topics.component';


interface AppState {
  auth: AuthState;
}

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [CommonModule, NavbarComponent, SectionCustomComponent, TopicsComponent, EpisodeHorizontalComponent, EmailModalComponent, PasswordModalComponent, SocialMediaModalComponent, UserInfoModalComponent, SwiperComponent, UpdatePodcastModalComponent, FooterComponent],
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
  isEditUserPersonnalInfo:boolean=false;
  isEditEmail:boolean=false;
  isEditSocial: boolean=false;
  isEditPassword: boolean=false;
  constructor(private userService: UserService,private podcastService: PodcastService, private router: Router,private bookmarkService: BookmarkService,private store: Store<AppState>,private cdr : ChangeDetectorRef) {}
  selectedPodcast:Partial<Podcast>={};

  ngOnInit() {
    this.fetchBookmarkedEpisodes();
    this.loadUserProfile();
    this.loadUserPodcasts();
  }

  fetchBookmarkedEpisodes() {
    this.bookmarkService.getBookmarkedEpisodes().subscribe({
      next: (episodes: Episode[]) => {
        this.bookmarkedEpisodes = episodes;
        console.log('Bookmarked episodes:', this.bookmarkedEpisodes.length);

      },
      error: (error: any) => {
        console.error('Error fetching bookmarked episodes:', error);
      }
    });

  }

  handleLike(event: { isLiked: boolean, episode: Episode }) {
    console.log('Liked:', event.isLiked, 'Episode:', event.episode);
  }


  handleUnfavorite(episodeId: number) {
    this.bookmarkedEpisodes = this.bookmarkedEpisodes.filter(ep => ep.id !== episodeId);
  }

  loadUserProfile() {
    this.isLoading = true;
    this.store.select(selectUser).subscribe({

    next: (user) => {
      if (user) {
        this.user = {
          ...user,
          profilImage: user.photo || 'assets/images/default-profile.png',
          name: `${user.firstName} ${user.lastName}`,
          birthDate: new Date(user.birthday).toLocaleDateString(),
          country: user.country,
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
    this.userService.updateUserProfile(userData).subscribe();
    this.isEditUserPersonnalInfo=true;
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

        this.podcastData = this.podcastData.map(podcast =>
          podcast.id === this.selectedPodcast.id ? { ...podcast, ...updatedPodcast } : podcast
        );

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
  editPersonnalInfoUserModal(){
    this.isEditUserPersonnalInfo=true;
  }
  closePersonnalInfoUserModal(){
    this.isEditUserPersonnalInfo=false;

  }

  editemailModal(){
    this.isEditEmail = true ;
  }

  closeEmailModal(){
    this.isEditEmail=false;

  }

  editSocialModal(){
    this.isEditSocial = true ;
  }

  closeSocialModal(){
    this.isEditSocial=false;

  }

  editPasswordModal(){
    this.isEditPassword = true ;
  }

  closePasswordModal(){
    this.isEditPassword=false;

  }

}
