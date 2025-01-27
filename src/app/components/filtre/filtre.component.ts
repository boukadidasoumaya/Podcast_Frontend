import { Component } from '@angular/core';

@Component({
  selector: 'app-filtre',
  standalone: true,
  imports: [],
  templateUrl: './filtre.component.html',
  styleUrl: './filtre.component.css'
})
export class FiltreComponent {

//   users=[{
//     profileImage: 'assets/images/profile',
//     profileName: 'Elsa',
//     profileRole: 'Influencer',
//   },
//   {
//     profileImage: 'assets/images/profile',
//     profileName: 'Elsa0',
//     profileRole: 'Influencer',
//   },
//   {
//     profileImage: 'assets/images/profile',
//     profileName: 'Elsa1',
//     profileRole: 'Influencer',
//   },
//   {
//     profileImage: 'assets/images/profile',
//     profileName: 'Elsa3',
//     profileRole: 'Influencer',
//   },
//   {
//     profileImage: 'assets/images/profile',
//     profileName: 'Elsa2',
//     profileRole: 'Influencer',
//   }
// ]



  users: string[] = ['user1', 'user2', 'user3', 'user4'];

}
