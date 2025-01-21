import { RouterModule, Routes } from '@angular/router';
import { CardEpisodeComponent } from './components/card-episode/card-episode.component';
import { NgModule } from '@angular/core';
import { TrendingEpisodesComponent } from './components/trending-episodes/trending-episodes.component';
import { SwiperComponent } from './components/swiper/swiper.component';
import { TopicsComponent } from './components/topics/topics.component';
import { TestComponent } from './components/test/test.component';
import { LatestEpisodesComponent } from './components/latest-episodes/latest-episodes.component';
export const routes: Routes = [
  {path:'',component:TrendingEpisodesComponent},
  {path:'swiper',component:TestComponent},
  {path:'r',component:LatestEpisodesComponent},
];


