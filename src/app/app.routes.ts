import {  Routes } from '@angular/router';
import { TrendingEpisodesComponent } from './components/trending-episodes/trending-episodes.component';
import { LatestEpisodesComponent } from './components/latest-episodes/latest-episodes.component';
import { DetailsPodcastComponent } from './pages/details-podcast/details-podcast.component';
import { HomeComponent } from './pages/home/home.component';
import { VidPageComponent } from './pages/vid-page/vid-page.component';
import { AboutComponent } from './pages/about/about.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProfilComponent } from './pages/profil/profil.component';
import { PagesComponent } from './pages/pages/pages.component';
import { LoginComponent } from './pages/login/login.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';

export const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'trending',component:TrendingEpisodesComponent},
  {path:'latest', component:LatestEpisodesComponent},
  {path:'profil',component:ProfilComponent},
  {path: 'details-podcast/:id', component: DetailsPodcastComponent },
  {path:'contact',component:ContactComponent},
  {path: 'login', component: LoginComponent },
  {path: 'episode/:id', component: VidPageComponent },
  {path:'forgot-password', component: ForgotPasswordComponent},
  {path:'pages',component:PagesComponent},
  {path:'about',component:AboutComponent},
  { path: '**', component: NotFoundComponent },


];
