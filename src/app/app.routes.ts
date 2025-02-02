import { RouterModule, Routes } from '@angular/router';
import { CardEpisodeComponent } from './components/card-episode/card-episode.component';
import { NgModule } from '@angular/core';
import { TrendingEpisodesComponent } from './components/trending-episodes/trending-episodes.component';
import { SwiperComponent } from './components/swiper/swiper.component';
import { TopicsComponent } from './components/topics/topics.component';
import { LoginComponent } from './components/login/login.component';
import { LatestEpisodesComponent } from './components/latest-episodes/latest-episodes.component';
import { ContactComponent } from './components/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';
import { DetailsPodcastComponent } from './components/details-podcast/details-podcast.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProfilComponent } from './components/profil/profil.component';
import { SearchComponent } from './components/navbar/search/search.component';
import { PagesComponent } from './components/pages/pages.component';
import { CardPodcastComponent } from './components/card-podcast/card-podcast.component';
import { VidPlayerComponent } from './components/vid-player/vid-player.component';
import { HomeComponent } from './home/home.component';

import { VidPageComponent } from './vid-page/vid-page.component';
import { HeroSectionComponent } from './components/hero-section/hero-section.component';
import { HeroCardComponent } from './components/hero-card/hero-card.component';
export const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'trending',component:TrendingEpisodesComponent},
  {path:'latest', component:LatestEpisodesComponent},
  {path:'profil',component:ProfilComponent},
  {path: 'details-podcast/:id', component: DetailsPodcastComponent },
  {path:'topics',component:TopicsComponent},
  {path:'contact',component:ContactComponent},
  {path:'search',component:SearchComponent},
  {path:'latest-episodes',component:LatestEpisodesComponent},
  {path:'profil',component:ProfilComponent},
  {path:'hero',component:HeroSectionComponent},
  {path:'hero-card',component:HeroCardComponent},
  {path:'home',component:HomeComponent},
  {path:'search',component:SearchComponent},
  {path:'pages',component:PagesComponent},
  {path:'card-podcast',component:CardPodcastComponent},
  { path: 'login', component: LoginComponent },


{ path: 'episode/:id', component: VidPageComponent },
];
