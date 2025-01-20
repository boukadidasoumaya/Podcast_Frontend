import { RouterModule, Routes } from '@angular/router';
import { CardEpisodeComponent } from './components/card-episode/card-episode.component';
import { NgModule } from '@angular/core';
import { TrendingEpisodesComponent } from './components/trending-episodes/trending-episodes.component';
import { ProfilComponent } from './components/profil/profil.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DetailsPodcastComponent } from './components/details-podcast/details-podcast.component';
import { FooterComponent } from './components/footer/footer.component';

export const routes: Routes = [
  {path:'',component:NavbarComponent},
  {path:'trending',component:TrendingEpisodesComponent},
  {path:'profil',component:ProfilComponent},
  {path:'details-podcast',component:DetailsPodcastComponent},
  {path:'footer',component:FooterComponent}


];

