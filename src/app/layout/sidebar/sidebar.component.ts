import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive
],
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  menuItems = [
    {
      path: '/dashboard',
      title: 'Dashboard',
      icon: 'shop', 
    },
    {
      path: '/tables',
      title: 'Tables',
      icon: 'office',
    },
  ];

  constructor() { }

  ngOnInit(): void { }

  isMobileMenu(): boolean {
    return window.innerWidth <= 991;
  }
}