import { Component } from '@angular/core';
import { Event, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeroSectionComponent } from './components/hero-section/hero-section.component';
import { SearchComponent } from './components/navbar/search/search.component';
import { PagesComponent } from './components/pages/pages.component';
import { MatSelectCountryModule } from '@angular-material-extensions/select-country';

import { Store } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import * as AuthActions from './store/auth/auth.actions';
import { ViewportScroller } from '@angular/common';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,MatSelectCountryModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'my-angular17-app';

  constructor(private store: Store, private router: Router,private viewportScroller: ViewportScroller) {}

  ngOnInit() {
    const token = localStorage.getItem('authToken');
    if (token) {
      this.store.dispatch(AuthActions.loadCurrentUser());
    } else {
      this.router.navigate(['']);
    }
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        // Défile vers le haut après chaque navigation
        this.viewportScroller.scrollToPosition([0, 0]);
      }
    });
  }
}
