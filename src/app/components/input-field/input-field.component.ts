import { Component, Input  } from '@angular/core';

@Component({
  selector: 'app-input-field',
  standalone: true,
  imports: [],
  templateUrl: './input-field.component.html',
  styleUrl: './input-field.component.css'
})
export class InputFieldComponent {
  @Input() icon: string = ''; 
  @Input() type: string = 'text'; 
  @Input() placeholder: string = '';
}
