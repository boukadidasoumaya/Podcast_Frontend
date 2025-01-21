import { Component } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css'
})
export class CarouselComponent {
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
