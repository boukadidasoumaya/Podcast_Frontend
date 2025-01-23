import { RouterModule, Routes } from '@angular/router';
import { CardEpisodeComponent } from './components/card-episode/card-episode.component';
import { NgModule } from '@angular/core';
import { TrendingEpisodesComponent } from './components/trending-episodes/trending-episodes.component';
import { SwiperComponent } from './components/swiper/swiper.component';
import { TopicsComponent } from './components/topics/topics.component';
import { TestComponent } from './components/test/test.component';
import { LoginComponent } from './components/login/login.component';
import { LatestEpisodesComponent } from './components/latest-episodes/latest-episodes.component';
import { ContactComponent } from './components/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';
import { DetailsPodcastComponent } from './components/details-podcast/details-podcast.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProfilComponent } from './components/profil/profil.component';
import { HeroSectionComponent } from './components/hero-section/hero-section.component';
import { HeroCardComponent } from './components/hero-card/hero-card.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home1/home.component';
import { SearchComponent } from './components/navbar/search/search.component';
import { VidPlayerComponent } from './components/vid-player/vid-player.component';

export const routes: Routes = [
  {path:'',component:NavbarComponent},
  {path:'trending',component:TrendingEpisodesComponent},
  {path:'latest', component:LatestEpisodesComponent},
  {path:'profil',component:ProfilComponent},
  {path:'details-podcast',component:DetailsPodcastComponent},
  {path:'topics',component:TopicsComponent},
  {path:'contact',component:ContactComponent},
  {path:'hero',component:HeroSectionComponent},
  {path:'hero-card',component:HeroCardComponent},
  {path:'footer',component:FooterComponent},
  {path:'swiper',component:TestComponent},
  {path:'home',component:HomeComponent},
  {path:'search',component:SearchComponent}
  {path:'latest-episodes',component:LatestEpisodesComponent},
  {path:'profil',component:ProfilComponent},
  {path:'swiper',component:TestComponent},
  {path:'',component:HomeComponent},
  {path:'v',component:VidPlayerComponent},
];
