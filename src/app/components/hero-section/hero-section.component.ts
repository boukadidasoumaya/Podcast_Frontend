import { Component } from '@angular/core';
import { HeroCardComponent } from '../hero-card/hero-card.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CommonModule } from '@angular/common';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { OwnersDetailsService } from '../../services/owners-details.service';
import { Owner } from '../../interfaces/app.interfaces';
declare var $: any;

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [HeroCardComponent,CommonModule,CarouselModule],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.css'
})
export class HeroSectionComponent {
  constructor(private ownerService : OwnersDetailsService){}
  

  slides: { nom: string, badges: string[], imagesrc: string }[] = [];
 
  ngOnInit(): void {
    this.loadPersons();
  }
  
  private async loadPersons(): Promise<void> {
    try {
      const persons = await this.ownerService.getUsers();
  
      // Map the normalized array to the slides
      this.slides = persons.map((person) => ({
        nom: person.firstName,
        badges: person.interests,
        imagesrc: person.photo,
      }));
    } catch (error) {
      console.error('Error loading persons:', error);
    }
  }
  
  

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    pullDrag: false,

    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,

    center: true,


    dots: true,
    dotsEach: 1,

    nav: false,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
  };
}
