import { RouterModule, Routes } from '@angular/router';
import { CardEpisodeComponent } from './components/card-episode/card-episode.component';
import { NgModule } from '@angular/core';
import { TrendingEpisodesComponent } from './components/trending-episodes/trending-episodes.component';
import { SwiperComponent } from './components/swiper/swiper.component';
import { TopicsComponent } from './components/topics/topics.component';
import { TestComponent } from './components/test/test.component';
import { LatestEpisodesComponent } from './components/latest-episodes/latest-episodes.component';
import { HomeComponent } from './home/home.component';
import { ProfilComponent } from './components/profil/profil.component';
export const routes: Routes = [
  {path:'latest-episodes',component:LatestEpisodesComponent},
  {path:'profil',component:ProfilComponent},
  {path:'swiper',component:TestComponent},
  {path:'',component:HomeComponent},
];


