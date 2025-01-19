import { Component } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {
  user = {
    name: 'John Doe',
    avatarUrl: 'assets/images/avatar.png'
  };
}
