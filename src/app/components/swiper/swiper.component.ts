import { Component } from '@angular/core';
import { SectionCustomComponent } from "../section-custom/section-custom.component";
import { DecimalPipe } from '@angular/common'; // Import DecimalPipe
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewportScroller } from '@angular/common'; // Import ViewportScroller
import { CarouselModule } from 'ngx-carousel-ease';
import { TopicsComponent } from '../topics/topics.component';
@Component({
  selector: 'app-swiper',
  standalone: true,
  imports: [CommonModule,TopicsComponent, CarouselModule ,SectionCustomComponent],
  templateUrl: './swiper.component.html',
  styleUrls: ['./swiper.component.css'],
  providers: [DecimalPipe] // Add DecimalPipe to providers
})
export class SwiperComponent {
  
}
