import { Component } from '@angular/core';
import { HeroCardComponent } from '../hero-card/hero-card.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CommonModule } from '@angular/common';
import { OwlOptions } from 'ngx-owl-carousel-o';
declare var $: any;

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [HeroCardComponent,CommonModule,CarouselModule],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.css'
})
export class HeroSectionComponent {
  // ngOnInit(): void {
  //   $(document).ready(function(){
  //     $(".owl-carousel").owlCarousel({
  //       items: 1,  // Affiche un item à la fois
  //       loop: true, // Le carousel fait une boucle
  //       margin: 10, // Marge entre les éléments
  //       nav: true, // Affiche la navigation (flèches)
  //       dots: true  // Affiche les points en bas du carousel
  //     });
  //   });
  // }
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
