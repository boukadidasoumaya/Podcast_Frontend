import { RouterModule, Routes } from '@angular/router';
import { CardEpisodeComponent } from './components/card-episode/card-episode.component';
import { NgModule } from '@angular/core';
import { TrendingEpisodesComponent } from './components/trending-episodes/trending-episodes.component';
import { ProfilComponent } from './components/profil/profil.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DetailsPodcastComponent } from './components/details-podcast/details-podcast.component';
import { FooterComponent } from './components/footer/footer.component';

import { SwiperComponent } from './components/swiper/swiper.component';
import { TopicsComponent } from './components/topics/topics.component';
import { TestComponent } from './components/test/test.component';
import { LoginComponent } from './components/login/login.component';
import { LatestEpisodesComponent } from './components/latest-episodes/latest-episodes.component';

export const routes: Routes = [
  {path:'',component:NavbarComponent},
  {path:'trending',component:TrendingEpisodesComponent},
  {path:'latest', component:LatestEpisodesComponent},
  {path:'profil',component:ProfilComponent},
  {path:'details-podcast',component:DetailsPodcastComponent},
  {path:'topics',component:TopicsComponent},
  {path:'footer',component:FooterComponent},
  {path:'swiper',component:TestComponent},
  {path:'login' , component:LoginComponent}
];


