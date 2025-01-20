import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-action-button',
  standalone: true,
  imports: [],
  templateUrl: './action-button.component.html',
  styleUrl: './action-button.component.css'
})
export class ActionButtonComponent {
  @Input() buttonText: string = ''; 
  @Input() messageText: string = ''; 
  @Input() linkText: string = ''; 
  @Input() questiontext: string = ''; 
  @Output() linkClick = new EventEmitter<void>(); 

  onLinkAction() {
    this.linkClick.emit(); 
  }
}
