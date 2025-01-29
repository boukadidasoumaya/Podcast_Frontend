import { Component } from '@angular/core';

@Component({
  selector: 'app-subscribe-button',
  standalone: true,
  imports: [],
  templateUrl: './subscribe-button.component.html',
  styleUrls: ['./subscribe-button.component.css']
})
export class SubscribeButtonComponent {
  isSubscribed = false;

  toggleSubscribe(): void {
    this.isSubscribed = !this.isSubscribed; 
  }
}
