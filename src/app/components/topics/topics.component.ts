import { Component } from '@angular/core';
import { SwiperComponent } from "../swiper/swiper.component";
import { CommonModule } from '@angular/common';
import { Input } from '@angular/core';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-topics',
  standalone: true,
  imports: [ CommonModule, RouterLink],
  templateUrl: './topics.component.html',
  styleUrl: './topics.component.css'
})
export class TopicsComponent {
  currentPage = 1;
  itemsPerPage = 4;  // Adjust according to your needs
  totalItems = 0;
  @Input() image: string = ''; // Input for image source
  @Input() title: string = ''; // Input for title
  @Input() customtext: string = ''; // Input for title
  @Input() episodes: number = 0; // Input for episodes (optional)
  @Input() podcastId: number=0;
@Input() episodeId: number=0;

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
    // Set the total number of items based on the length of pagedTopics
    this.totalItems = this.pagedTopics.length;
  }


  // Calculate the topics to display based on the current page and items per page
  get displayedTopics() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.pagedTopics.slice(startIndex, endIndex);
  }
}
