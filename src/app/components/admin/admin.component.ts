import { Component ,OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { SidebarComponent } from '../../layout/sidebar/sidebar.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [SidebarComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit, OnDestroy {
  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    // Add classes to the body
    this.renderer.addClass(document.body, 'g-sidenav-show');
    this.renderer.addClass(document.body, 'bg-gray-100');
  }

  ngOnDestroy(): void {
    // Remove classes to avoid affecting other components
    this.renderer.removeClass(document.body, 'g-sidenav-show');
    this.renderer.removeClass(document.body, 'bg-gray-100');
  }
}