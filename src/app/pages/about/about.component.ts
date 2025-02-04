import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { HeroCardComponent } from '../../components/hero-card/hero-card.component';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../components/footer/footer.component';
import { projectDescription } from '../../../assets/shared/project-description';
import { team } from '../../../assets/shared/team';
@Component({
  selector: 'app-about',
  standalone: true,
  imports: [NavbarComponent, HeroCardComponent, CommonModule, FooterComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
})
export class AboutComponent {
  description = projectDescription;
  team = team;
}
