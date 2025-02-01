import { Component } from '@angular/core';
import { Input } from '@angular/core';
@Component({
  selector: 'app-section-custom',
  standalone: true,
  imports: [],
  templateUrl: './section-custom.component.html',
  styleUrl: './section-custom.component.css'
})
export class SectionCustomComponent {
  @Input() title: string = ''; // Default title
  @Input() sectionId: string = ''; // Default ID
}