import { RouterModule, Routes } from '@angular/router';
import { CardEpisodeComponent } from './components/card-episode/card-episode.component';
import { NgModule } from '@angular/core';
import { TrendingEpisodesComponent } from './components/trending-episodes/trending-episodes.component';
import { ProfilComponent } from './components/profil/profil.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeroSectionComponent } from './components/hero-section/hero-section.component';
import { HeroCardComponent } from './components/hero-card/hero-card.component';
import { AppComponent } from './app.component';
import { CarouselComponent } from 'ngx-owl-carousel-o';
export const routes: Routes = [
  {path:'',component:NavbarComponent},
  {path:'trending',component:TrendingEpisodesComponent},
  {path:'profil',component:ProfilComponent},
  {path:'hero',component:HeroSectionComponent},
  {path:'hero-card',component:HeroCardComponent},
  {path:'home',component:AppComponent},
  {path:'carousel',component:CarouselComponent}

];
