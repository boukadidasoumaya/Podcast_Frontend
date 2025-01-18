import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-headphones-icon',
  standalone: true,
  templateUrl: './headphones-icon.component.html',
  styleUrls: ['./headphones-icon.component.css']
})
export class HeadphonesIconComponent {
  // Permet de passer le nombre d'écoutes en entrée (dynamique)
  @Input() listensCount: string = '0';
}
