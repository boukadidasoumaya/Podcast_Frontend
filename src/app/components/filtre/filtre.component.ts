import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { error, get } from 'jquery';
import { map, Observable } from 'rxjs';
import { Podcast, User } from '../../interfaces/app.interfaces';
import { FiltreService } from '../../services/filtre.service';
@Component({
  selector: 'app-filtre',
  standalone: true,
  imports: [CommonModule,FormsModule,HttpClientModule],
  templateUrl: './filtre.component.html',
  styleUrl: './filtre.component.css'
})
export class FiltreComponent {

constructor(private http: HttpClient,private filtreService: FiltreService) { }
  filtres={
    title:'',
    topic:'',
    nbre_episodes:0,
    user:'',
    minDuration:0,
    maxDuration:0,
  };
  podcasts: Podcast[] = [];

  @Output() filteredpodcasts: EventEmitter<{ podcasts: Podcast[] }> = new EventEmitter();
  @Output() reset: EventEmitter<{ podcasts: Podcast[] }> = new EventEmitter();

  users: User[]=[];
  presentors:string[]=[];
  topics:string[]=[];


    async getAllpodcasts(){

      this.filtreService.getAllpodcasts().subscribe({
        next:(res)=>{
          this.podcasts = res;
          this.reset.emit({ podcasts: res});
          console.log('podcasts', res);
        },
        error:(err)=>{console.log(err)}
      }
   );
   }

   async getFilteredPodcasts(){

    this.filtreService.getFilteredPodcasts(this.filtres).subscribe({
      next:(res)=>{
        console.log('emission started');
        this.filteredpodcasts.emit({ podcasts: res});
        console.log('emission succeeded');
        return res;
      },
      error:(err)=>{console.log(err)}
    }
 );
 }
 async getAllusers(){
    this.filtreService.getAllusers().subscribe({
      next:(res)=>{
        this.users = res;
        console.log('users', res);
        for (let i = 0; i < this.users.length; i++) {
          this.presentors[i]=this.users[i].username;
        }
        console.log('presentors',this.presentors);
      },
      error:(err)=>{console.log(err)}
    }
);

}

// async getAlltopics(){
//   this.filtreService.getAlltopics().subscribe({
//     next:(res)=>{
//       this.topics = res.map(topic => topic.name);
//       console.log('topics', res);
//     },
//     error:(err)=>{console.log(err)}
//   }
// );

// }

ngOnInit(): void {
this.getAllpodcasts();
}

//filtrage :
  async filtrer(){
    const filtrevide = Object.values(this.filtres).every(value =>
      value === '' || value === 0
    );
    if(filtrevide){
    this.getAllpodcasts();
    }else{
    this.getFilteredPodcasts();
    console.log('filtres',this.filtres);
    console.log(await this.getAllpodcasts());
    const filteredpodcasts = await this.getFilteredPodcasts();
    console.log('filtered pods',filteredpodcasts);
    await this.getAllusers();
    console.log('presentors',this.presentors);
  }}

  reinitialiser(){
      this.filtres.title='',
      this.filtres.topic='',
      this.filtres.nbre_episodes=0,
      this.filtres.user='',
      this.filtres.minDuration=0,
      this.filtres.maxDuration=0;
      this.getAllpodcasts();
    }
}
