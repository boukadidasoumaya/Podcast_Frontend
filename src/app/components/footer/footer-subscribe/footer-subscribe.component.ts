import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-footer-subscribe',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './footer-subscribe.component.html',
  styleUrl: './footer-subscribe.component.css'
})
export class FooterSubscribeComponent {

}
