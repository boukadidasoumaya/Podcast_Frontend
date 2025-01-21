import { RouterModule, Routes } from '@angular/router';
import { CardEpisodeComponent } from './components/card-episode/card-episode.component';
import { NgModule } from '@angular/core';
import { TrendingEpisodesComponent } from './components/trending-episodes/trending-episodes.component';
import { ProfilComponent } from './components/profil/profil.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeroSectionComponent } from './components/hero-section/hero-section.component';
import { HeroCardComponent } from './components/hero-card/hero-card.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { SearchComponent } from './components/navbar/search/search.component';
import { LatestEpisodesComponent } from './components/latest-episodes/latest-episodes.component';
import { LoginComponent } from './components/login/login.component';
export const routes: Routes = [
  {path:'trending',component:TrendingEpisodesComponent},
  {path:'',component:LatestEpisodesComponent},
  {path: 'latest-episodes', component: LatestEpisodesComponent },
  {path: 'login', component: LoginComponent },
  {path:'navbar',component:NavbarComponent},
  {path:'profil',component:ProfilComponent},
  {path:'hero',component:HeroSectionComponent},
  {path:'hero-card',component:HeroCardComponent},
  {path:'home',component:HomeComponent},
  {path:'search',component:SearchComponent}

];
