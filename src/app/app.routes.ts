import { RouterModule, Routes } from '@angular/router';
import { CardEpisodeComponent } from './components/card-episode/card-episode.component';
import { NgModule } from '@angular/core';
import { TrendingEpisodesComponent } from './components/trending-episodes/trending-episodes.component';
import { LatestEpisodesComponent } from './components/latest-episodes/latest-episodes.component';
import { LoginComponent } from './components/login/login.component';
export const routes: Routes = [
  {path:'trending',component:TrendingEpisodesComponent},
  {path:'',component:LatestEpisodesComponent},
  {path: 'latest-episodes', component: LatestEpisodesComponent },
  {path: 'login', component: LoginComponent }
];

