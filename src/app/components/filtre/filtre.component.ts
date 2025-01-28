import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { error, get } from 'jquery';
import { map, Observable } from 'rxjs';
import { Podcast } from '../../interfaces/app.interfaces';
import { FiltreService } from '../../services/filtre.service';
@Component({
  selector: 'app-filtre',
  standalone: true,
  imports: [CommonModule,FormsModule,HttpClientModule],
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
url='http://localhost:3000/podcast';
constructor(private http: HttpClient,private filtreService: FiltreService) { }
  filtres={
    title:'',
    topic:'',
    nbre_episodes:'0',
    user:'',
    minDuration:'',
    maxDuration:'',
  };
  podcasts: Podcast[] = [];


  getusers(){
    this.http.get(`${this.url}/user/users`).subscribe((data: any) => {
      console.log(data);
    });
  }

  // getAllPodcasts(): Observable<string[]> {
  //   return this.http.get<any[]>(this.url).pipe(
  //     map((podcasts: any[]) => {
  //       this.podcasts = podcasts.map(podcast => podcast.title);
  //       return this.podcasts;
  //     })
  //   );
  // }
    getAllpodcasts(){

      this.filtreService.getAllpodcasts().subscribe({
        next:(res)=>{
          this.podcasts = res;
          console.log('Related Episodes:', res);
        },
        error:(err)=>{console.log(err)}
      }


   );
   }


  getAllUsers(): Observable<string[]> {
    return this.http.get<any[]>(`${this.url}/user/users`).pipe(
      map(users => {
        this.users = users.map(user => user.name);
        return this.users;
      })
    );
  }

  getFilteredPodcasts(filters: any): Observable<any> {
    let params = new HttpParams();
    Object.keys(filters).forEach(key => {
      if (filters[key]) {
        params = params.set(key, filters[key]);
      }
    });
    return this.http.get<any>(`${this.url}/podcasts`, { params });
  }

  // topics=this.gettopics();
  // users=this.getusers();
users=['user1','user2','user3','user4','user5'];
topics=['topic1','topic2','topic3','topic4','topic5'];

ngOnInit(): void {
  this.getAllpodcasts();

}

  filtrer(){
    console.log(this.filtres);
    console.log(this.getAllpodcasts());
  }

  reinitialiser(){}



}
