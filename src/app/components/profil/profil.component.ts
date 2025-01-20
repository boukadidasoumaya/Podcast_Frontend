import { Component } from '@angular/core';
import { EmailModalComponent } from '../modals/email-modal/email-modal.component';
import { PasswordModalComponent } from '../modals/password-modal/password-modal.component';
import { SocialMediaModalComponent } from '../modals/social-media-modal/social-media-modal.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { UserInfoModalComponent } from '../modals/user-info-modal/user-info-modal/user-info-modal.component';
import { SwiperComponent } from '../swiper/swiper.component';
import { TopicsComponent } from '../topics/topics.component';

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [NavbarComponent,EmailModalComponent,PasswordModalComponent,SocialMediaModalComponent,UserInfoModalComponent,SwiperComponent,TopicsComponent
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
}
