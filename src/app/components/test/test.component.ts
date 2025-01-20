import { Component } from '@angular/core';
import { SwiperComponent } from '../swiper/swiper.component';
import { TopicsComponent } from '../topics/topics.component';
@Component({
  selector: 'app-test',
  standalone: true,
  imports: [SwiperComponent,TopicsComponent],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent {
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
