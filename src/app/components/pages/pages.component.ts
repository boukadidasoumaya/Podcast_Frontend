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


@Component({
  selector: 'app-pages',
  standalone: true,
  imports: [ CommonModule,FiltreComponent,NavbarComponent,NgArrayPipesModule,CardPodcastComponent,HttpClientModule],
  templateUrl: './pages.component.html',
  styleUrl: './pages.component.css'
})
export class PagesComponent {

  constructor(private http: HttpClient) { }

  podcasts:any[]=[];
  async handleFilteredPodcasts(event: { podcasts: Podcast[] }) {
    this.podcasts = event.podcasts;
    console.log('Podcasts filtrés reçus dans PagesComponent:', this.podcasts);
  }

}
