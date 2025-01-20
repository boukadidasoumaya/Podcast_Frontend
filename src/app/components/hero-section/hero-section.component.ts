import { Component } from '@angular/core';
import { HeroCardComponent } from '../hero-card/hero-card.component';
import { CommonModule } from '@angular/common';
declare var $: any;

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [HeroCardComponent,CommonModule],
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

}
