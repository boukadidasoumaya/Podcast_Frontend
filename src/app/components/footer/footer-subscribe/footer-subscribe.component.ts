import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SubscribeService } from '../../../services/subscribe.service';

@Component({
  selector: 'app-footer-subscribe',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
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
        alert(err?.error?.message || 'An error occurred. Please try again.');
      },
    });
  }
}
