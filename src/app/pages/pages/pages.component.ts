import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';

import { NgArrayPipesModule } from 'ngx-pipes';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Podcast } from '../../interfaces/app.interfaces';
import { CardPodcastComponent } from '../../components/card-podcast/card-podcast.component';
import { FiltreComponent } from '../../components/filtre/filtre.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { PodcastService } from '../../services/podcast.service';
import {  Router } from '@angular/router';


@Component({
  selector: 'app-pages',
  standalone: true,
  imports: [ CommonModule,FiltreComponent,NavbarComponent,NgArrayPipesModule,CardPodcastComponent,HttpClientModule,FooterComponent],
  templateUrl: './pages.component.html',
  styleUrl: './pages.component.css'
})
export class PagesComponent {

  constructor(private http: HttpClient,private podcastService: PodcastService,private router:Router) { }

  podcasts:any[]=[];
  async ngOnInit() {}
  async handleFilteredPodcasts(event: { podcasts: Podcast[] }) {
    this.podcasts = event.podcasts;
  }

  reset(event: { podcasts: Podcast[] }) {
    this.podcasts = event.podcasts;

  }
  onPodcastSelect(podcast: Podcast) {
    const podcastId=podcast.id;
    this.podcastService.getFirstEpisode(podcastId).subscribe({
      next: (episode) => {
        if (episode) {
          this.router.navigate([`/details-podcast/${episode.id}`]);
        } else {
          console.error("Aucun épisode trouvé.");
        }
      },
      error: (err) => console.error("Erreur lors de la récupération de l'épisode :", err),
    });
  }

}
