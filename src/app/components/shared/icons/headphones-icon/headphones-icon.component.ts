import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { SocketService } from '../../../../services/views.service';
import { EpisodeService } from '../../../../services/episode.service';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-headphones-icon',
  standalone: true,
  templateUrl: './headphones-icon.component.html',
  styleUrls: ['./headphones-icon.component.css']
})
export class HeadphonesIconComponent {
  // Permet de passer le nombre d'écoutes en entrée (dynamique)
  viewCount: number = 0;
  @Input() episodeId: number = 0;
  private viewUpdateSubscription!: Subscription; // This tells TypeScript you'll assign it later

  constructor(private socketService: SocketService,     private cdr: ChangeDetectorRef ,    private episodeService: EpisodeService // Inject the EpisodeService to fetch episode data
  ) {}

  ngOnInit(): void {
    // Fetch initial data
    this.getInitialEpisodeData();
  
    // Subscribe to the 'viewUpdate' event
    this.viewUpdateSubscription = this.socketService.onViewUpdate().subscribe((data) => {
      console.log('Updated View Count from WebSocket:', data);  // Log received data
      if (data.id === this.episodeId) {
        this.viewCount = data.views;
        this.cdr.detectChanges();  // Trigger change detection
      }
    });
  }
  getInitialEpisodeData(): void {
    this.episodeService.getEpisodeById(this.episodeId).subscribe(
      (episodeData) => {
        console.log('Initial Episode Data:', episodeData); // Log to check if correct data is fetched
        this.viewCount = episodeData.views; // Set initial view count
        this.cdr.detectChanges(); // Trigger change detection after initial data
      },
      (error) => {
        console.error('Error fetching episode data:', error);
      }
    );
  }
  

  ngOnDestroy(): void {
    // Clean up the subscription to avoid memory leaks
    if (this.viewUpdateSubscription) {
      this.viewUpdateSubscription.unsubscribe();
    }
  }
}