import { RouterModule, Routes } from '@angular/router';
import { CardEpisodeComponent } from './components/card-episode/card-episode.component';
import { NgModule } from '@angular/core';
import { TrendingEpisodesComponent } from './components/trending-episodes/trending-episodes.component';
import { ProfilComponent } from './components/profil/profil.component';
import { NavbarComponent } from './components/navbar/navbar.component';
export const routes: Routes = [
  {path:'',component:NavbarComponent},
  {path:'trending',component:TrendingEpisodesComponent},
  {path:'profil',component:ProfilComponent}

];

