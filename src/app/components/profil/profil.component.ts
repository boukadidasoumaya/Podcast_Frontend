import { Component } from '@angular/core';
import { EmailModalComponent } from '../modals/email-modal/email-modal.component';
import { PasswordModalComponent } from '../modals/password-modal/password-modal.component';
import { SocialMediaModalComponent } from '../modals/social-media-modal/social-media-modal.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { UserInfoModalComponent } from '../modals/user-info-modal/user-info-modal/user-info-modal.component';
import { SwiperComponent } from '../swiper/swiper.component';
import { TopicsComponent } from '../topics/topics.component';
import { EpisodeHorizontalComponent } from '../episode-horizontal/episode-horizontal.component';
import { SectionCustomComponent } from '../section-custom/section-custom.component';

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [NavbarComponent,SectionCustomComponent, EpisodeHorizontalComponent,EmailModalComponent,PasswordModalComponent,SocialMediaModalComponent,UserInfoModalComponent,SwiperComponent,TopicsComponent
  ],
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']

})
export class ProfilComponent {
  user = {
    profilImage:'assets/images/profile/exemple.jpg',
    name: 'Soumaya',
    birthDate: '16-05-2002',
    address: 'Tunisia',
    job: 'Influencer',
    email:'soumaya.boukadida@insat.ucar.tn',
    memberSince: 2002,
    socialMedia: {
      whatsapp: '52 916 913',
      instagram: 'soumaya_boukadida',
      twitter: 'soumaya boukadida'
    }
  };
  updateUserPersonnalInfo={
    name: 'Soumaya',
    birthDate: '16-05-2002',
    address: 'Tunisia',
    job: 'Influencer',
  }
  displayedTopics = [
    {
      title: 'Productivity',
      image: 'images/topics/physician-consulting-his-patient-clinic.jpg',
      episodes: 50
    },
    {
      title: 'Technician',
      image: 'images/topics/repairman-doing-air-conditioner-service.jpg',
      episodes: 12
    },
    {
      title: 'Mindfulness',
      image: 'images/topics/woman-practicing-yoga-mat-home.jpg',
      episodes: 35
    },

  ];
  podcastData = [
    {
      imageUrl: 'assets/images/podcast/27376480_7326766.jpg',
      title: 'Modern Vintage',
      episodeDuration: '50 Minutes',
      episodeNumber: 15,
      hostName: 'Elsa',
      hostImage: 'images/profile/woman-posing-black-dress-medium-shot.jpg',
      hostRole: 'Influencer',
      description: 'Lorem Ipsum dolor sit amet consectetur',
      stats: {
        headphones: 120,
        heart: 425,
        chat: 11,
        download: 50,
      },
    },
    {
      imageUrl: 'assets/images/podcast/27376480_7326766.jpg',
      title: 'Tech Talks',
      episodeDuration: '30 Minutes',
      episodeNumber: 8,
      hostName: 'John',
      hostImage: 'assets/images/podcast/27376480_7326766.jpg',
      hostRole: 'Tech Enthusiast',
      description: 'The lateszz /n t trends in technology.',
      stats: {
        headphones: 20,
        heart: 80,
        chat: 50,
        download: 70,
      },
    },{
      imageUrl: 'assets/images/podcast/27376480_7326766.jpg',
      title: 'Modern Vintage',
      episodeDuration: '50 Minutes',
      episodeNumber: 15,
      hostName: 'Elsa',
      hostImage: 'images/profile/woman-posing-black-dress-medium-shot.jpg',
      hostRole: 'Influencer',
      description: 'Lorem Ipsum dolor sit amet consectetur',
      stats: {
        headphones: 120000,
        heart: 42500,
        chat: 11000,
        download: 50000,
      },
    },
    {
      imageUrl: 'assets/images/podcast/27376480_7326766.jpg',
      title: 'Tech Talks',
      episodeDuration: '30 Minutes',
      episodeNumber: 8,
      hostName: 'John',
      hostImage: 'assets/images/podcast/27376480_7326766.jpg',
      hostRole: 'Tech Enthusiast',
      description: 'The latest trends in technology.',
      stats: {
        headphones: 200000,
        heart: 80000,
        chat: 5000,
        download: 70000,
      },
    },];
  }