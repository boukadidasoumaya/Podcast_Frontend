import { Component } from '@angular/core';
import { SectionCustomComponent } from "../section-custom/section-custom.component";
import { DecimalPipe } from '@angular/common'; // Import DecimalPipe
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewportScroller } from '@angular/common'; // Import ViewportScroller

@Component({
  selector: 'app-swiper',
  standalone: true,
  imports: [CommonModule ,SectionCustomComponent],
  templateUrl: './swiper.component.html',
  styleUrls: ['./swiper.component.css'],
  providers: [DecimalPipe] // Add DecimalPipe to providers
})
export class SwiperComponent {
  // Array to hold the podcast data
  podcasts = [
    {
      title: 'Modern Vintage',
      duration: '50 Minutes',
      episode: 15,
      image: 'images/podcast/11683425_4790593.jpg',
      profileImage: 'images/profile/woman-posing-black-dress-medium-shot.jpg',
      name: 'Elsa',
      type: 'Influencer',
      listeners: 120000,
      likes: 42500,
      comments: 11000,
      downloads: 50000
    },
    {
      title: 'Daily Talk',
      duration: '15 Minutes',
      episode: 45,
      image: 'images/podcast/12577967_02.jpg',
      profileImage: 'images/profile/handsome-asian-man-listening-music-through-headphones.jpg',
      name: 'William',
      type: 'Vlogger',
      listeners: 140000,
      likes: 22400,
      comments: 16000,
      downloads: 62000
    },{
      title: 'Modern Vintage',
      duration: '50 Minutes',
      episode: 15,
      image: 'images/podcast/11683425_4790593.jpg',
      profileImage: 'images/profile/woman-posing-black-dress-medium-shot.jpg',
      name: 'Elsa',
      type: 'Influencer',
      listeners: 120000,
      likes: 42500,
      comments: 11000,
      downloads: 50000
    },
    {
      title: 'Daily Talk',
      duration: '15 Minutes',
      episode: 45,
      image: 'images/podcast/12577967_02.jpg',
      profileImage: 'images/profile/handsome-asian-man-listening-music-through-headphones.jpg',
      name: 'William',
      type: 'Vlogger',
      listeners: 140000,
      likes: 22400,
      comments: 16000,
      downloads: 62000
    }
    // Add more podcasts here...
  ];

  // Pagination properties
  currentPage = 1;
  itemsPerPage = 2;
  totalItems = this.podcasts.length;

  constructor(private decimalPipe: DecimalPipe, private viewportScroller: ViewportScroller) {}

  // Method to get the current page items
  get pagedPodcasts() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.podcasts.slice(startIndex, startIndex + this.itemsPerPage);
  }

  // Method to handle page change and smooth scroll
  changePage(pageNumber: number) {
    this.currentPage = pageNumber;
    // Scroll to the top of the page smoothly
    this.viewportScroller.scrollToPosition([0, 0]);
  }
  get totalPages() {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }
  // Method to format numbers with DecimalPipe
  formatNumber(value: number) {
    return this.decimalPipe.transform(value);
  }
}