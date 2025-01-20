import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-podcaster',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './podcaster.component.html',
  styleUrl: './podcaster.component.css'
})
export class PodcasterComponent {
  @Input() name: string = '';
  @Input() imageUrl: string = '';
  @Input() badges: string[] = [];
  @Input() socialLinks: { twitter: string, facebook: string, pinterest: string } = { twitter: '#', facebook: '#', pinterest: '#' };

}
