import { Component } from '@angular/core';
import { TrendingEpisodesComponent } from '../trending-episodes/trending-episodes.component';
import { CardEpisodeComponent } from '../card-episode/card-episode.component';
import { CommonModule } from '@angular/common';
import { SearchComponent } from '../navbar/search/search.component';
import { FiltreComponent } from '../filtre/filtre.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { NgArrayPipesModule } from 'ngx-pipes';
import { CardPodcastComponent } from '../card-podcast/card-podcast.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Podcast } from '../../interfaces/app.interfaces';
import { FooterComponent } from '../footer/footer.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-pages',
  standalone: true,
  imports: [ CommonModule,FiltreComponent,NavbarComponent,NgArrayPipesModule,CardPodcastComponent,HttpClientModule,FooterComponent],
  templateUrl: './pages.component.html',
  styleUrl: './pages.component.css'
})
export class PagesComponent {

  constructor(private http: HttpClient, private router: Router) { }

  podcasts:any[]=[];
  async ngOnInit() {}
  async handleFilteredPodcasts(event: { podcasts: Podcast[] }) {
    this.podcasts = event.podcasts;
    console.log('filtreeeeeesss', this.podcasts);
  }

  reset(event: { podcasts: Podcast[] }) {
    this.podcasts = event.podcasts;
    console.log('reseeeeeeeeeeeeeeet ', this.podcasts);

  }
  onPodcastSelect(podcast : Podcast){
    this.router.navigate(['/details-podcast/:podcast.id']);
  }

}
