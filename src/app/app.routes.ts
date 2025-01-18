import { RouterModule, Routes } from '@angular/router';
import { CardEpisodeComponent } from './components/card-episode/card-episode.component';
import { NgModule } from '@angular/core';
import { TrendingEpisodesComponent } from './components/trending-episodes/trending-episodes.component';
import { SwiperComponent } from './components/swiper/swiper.component';

export const routes: Routes = [
  {path:'',component:TrendingEpisodesComponent},
  {path:'swiper',component:SwiperComponent},
];


