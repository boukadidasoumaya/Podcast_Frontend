import { Component } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { HeroCardComponent } from "../../components/hero-card/hero-card.component";
import { CommonModule } from '@angular/common';
import { FooterComponent } from "../../components/footer/footer.component";
@Component({
  selector: 'app-about',
  standalone: true,
  imports: [NavbarComponent, HeroCardComponent, CommonModule, FooterComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  podcaters: any[] = [
    {
      nom: 'Taylor',
      imagesrc: 'assets/images/profile/cute-smiling-woman-outdoor-portrait.jpg',
      badges: ['Modeling', 'Fashion'],
    },
    {
      nom: 'Taylor',
      imagesrc: 'assets/images/profile/cute-smiling-woman-outdoor-portrait.jpg',
      badges: ['Modeling', 'Fashion'],
    },]

}
