import {
  Component,
  Input,
  ElementRef,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { register } from 'swiper/element/bundle';
register();

@Component({
  selector: 'app-little-swiper',
  standalone: true,
  imports: [CommonModule, RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './swiper-episodes.component.html',
  styleUrls: ['./swiper-episodes.component.css'],
})
export class SwiperEpisodesComponent implements AfterViewInit, OnDestroy {
  @Input() nbepisodes: number = 0; // Nombre total d'épisodes
  @Input() littleImage: string = ''; // Nom de l'image à afficher
  @ViewChild('revealElement') revealElement!: ElementRef;

 // Tableau statique pour les épisodes (par exemple, 10 épisodes)
 episodes = Array(10).fill(0).map((_, i) => i);

  breakpoints = {
    1024: {
      slidesPerView: 3,
      spaceBetween: 10,
    },
    1200: {
      slidesPerView: 4,
      spaceBetween: 10,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    590: {
      slidesPerView: 1,
      spaceBetween: 10,
    },
  };

  private scrollHandler: () => void;

  constructor() {
    this.scrollHandler = this.handleScroll.bind(this);
  }

  ngOnInit() {
    // Initialiser le tableau des épisodes
    this.episodes = Array.from({ length: this.nbepisodes }, (_, i) => i);
  }

  ngAfterViewInit() {
    window.addEventListener('scroll', this.scrollHandler);
    this.checkVisibility();
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.scrollHandler);
  }

  private handleScroll() {
    this.checkVisibility();
  }

  private checkVisibility() {
    const element = this.revealElement.nativeElement;
    const rect = element.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    const isVisible = rect.top <= viewportHeight / 1.3 && rect.bottom >= 0;

    if (isVisible) {
      element.classList.add('reveal');
    } else {
      element.classList.remove('reveal');
    }
  }
}
