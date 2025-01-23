import { Component } from '@angular/core';
import { SwiperComponent } from "../swiper/swiper.component";
import { CommonModule } from '@angular/common';
import { Input } from '@angular/core';
@Component({
  selector: 'app-topics',
  standalone: true,
  imports: [ CommonModule],
  templateUrl: './topics.component.html',
  styleUrl: './topics.component.css'
})
export class TopicsComponent {
  currentPage = 1;
  itemsPerPage = 4;
  totalItems = 0;
  @Input() image: string = '';
  @Input() title: string = '';
  @Input() subtitle: string = '';

  pagedTopics = [
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
    {
      title: 'Cooking',
      image: 'images/topics/delicious-meal-with-sambal-arrangement.jpg',
      episodes: 12
    },
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
    {
      title: 'Cooking',
      image: 'images/topics/delicious-meal-with-sambal-arrangement.jpg',
      episodes: 12
    }
  ];

  ngOnInit(): void {
    this.totalItems = this.pagedTopics.length;
  }


  // Calculate the topics to display based on the current page and items per page
  get displayedTopics() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.pagedTopics.slice(startIndex, endIndex);
  }
}
