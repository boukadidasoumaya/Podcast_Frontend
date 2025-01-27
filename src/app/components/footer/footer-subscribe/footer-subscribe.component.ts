import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SubscribeService } from '../../../services/subscribe.service';

@Component({
  selector: 'app-footer-subscribe',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './footer-subscribe.component.html',
  styleUrls: ['./footer-subscribe.component.css'],
})
export class FooterSubscribeComponent {
  email: string = '';

  constructor(private subscribeService: SubscribeService) {}

  onSubmit() {
    if (!this.email) return;

    this.subscribeService.subscribe(this.email).subscribe({
      next: (response) => {
        alert('Subscription successful!');
        this.email = ''; 
      },
      error: (err) => {
        alert(err?.message || 'An error occurred. Please try again.');
      },
    });
  }
}
