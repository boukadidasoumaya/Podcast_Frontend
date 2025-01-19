import { Component } from '@angular/core';
import { SectionCustomComponent } from "../section-custom/section-custom.component";
import { DecimalPipe } from '@angular/common'; // Import DecimalPipe
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewportScroller } from '@angular/common'; // Import ViewportScroller
import { CarouselModule } from 'ngx-carousel-ease';

@Component({
  selector: 'app-swiper',
  standalone: true,
  imports: [CommonModule, CarouselModule ,SectionCustomComponent],
  templateUrl: './swiper.component.html',
  styleUrls: ['./swiper.component.css'],
  providers: [DecimalPipe] // Add DecimalPipe to providers
})
export class SwiperComponent {
  currentPage = 1;
  itemsPerPage = 4;  // Adjust according to your needs
  totalItems = 0;
  
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

  get totalPages() {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  changePage(pageNumber: number) {
    this.currentPage = pageNumber;
  }

  // Calculate the topics to display based on the current page and items per page
  get displayedTopics() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.pagedTopics.slice(startIndex, endIndex);
  }
}
