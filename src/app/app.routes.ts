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
import { VidPlayerComponent } from './components/vid-player/vid-player.component';

export const routes: Routes = [
  {path:'trending',component:TrendingEpisodesComponent},
  {path:'latest', component:LatestEpisodesComponent},
  {path:'profil',component:ProfilComponent},
  {path:'details-podcast',component:DetailsPodcastComponent},
  {path:'topics',component:TopicsComponent},
  {path:'contact',component:ContactComponent},
  {path:'footer',component:FooterComponent},
  {path:'search',component:SearchComponent},
  {path:'latest-episodes',component:LatestEpisodesComponent},
  {path:'v',component:VidPlayerComponent},
];
