import { Component } from '@angular/core';
import { SectionCustomComponent } from "../section-custom/section-custom.component";
import { DecimalPipe } from '@angular/common'; // Import DecimalPipe
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'ngx-carousel-ease';
import { TopicsComponent } from '../topics/topics.component';
import { Input } from '@angular/core';
import { ContentChild, ContentChildren, QueryList, TemplateRef } from '@angular/core';
@Component({
  selector: 'app-swiper',
  standalone: true,
  imports: [CommonModule, CarouselModule ],
  templateUrl: './swiper.component.html',
  styleUrls: ['./swiper.component.css'],
  providers: [DecimalPipe] // Add DecimalPipe to providers
})
export class SwiperComponent {
  @Input() cards: any[] = [];
  @Input() colClass: string = ''; // Input for column classes
  @ContentChild(TemplateRef) contentTemplate!: TemplateRef<any>;
  @Input() slideToShow: number = 2;  // Default to 2
  @Input() slideWidth: number = 300;

}
