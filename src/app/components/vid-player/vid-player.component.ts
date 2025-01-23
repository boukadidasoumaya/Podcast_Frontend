import { Component } from '@angular/core';
import { AfterViewInit, ElementRef, OnDestroy } from '@angular/core';
import Plyr from 'plyr';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Input } from '@angular/core';
@Component({
  selector: 'app-vid-player',
  imports : [HttpClientModule],
  standalone: true,
  templateUrl: './vid-player.component.html',
  styleUrl: './vid-player.component.css'
})
  
export class VidPlayerComponent implements AfterViewInit, OnDestroy {
  private player: Plyr | undefined;
  private hasCountedView = false;

  @Input() episodeId!: number; // Episode ID from the backend

  constructor(private elRef: ElementRef, private http: HttpClient) {}

  ngAfterViewInit(): void {
    const videoElement = this.elRef.nativeElement.querySelector('#player');
    if (videoElement) {
      // Initialize Plyr
      this.player = new Plyr(videoElement, {
        controls: ['play', 'progress', 'current-time', 'mute', 'volume', 'settings', 'fullscreen'],
        fullscreen: { enabled: true, fallback: true, iosNative: true },
        settings: ['quality', 'speed', 'loop'],
      });

      // Register event listener for 'timeupdate'
      this.player.on('timeupdate', () => {
        console.log('timeupdate event triggered');
        this.trackProgress();
      });

      console.log('Player initialized successfully.');
    } else {
      console.error('Video element not found.');
    }
  }

  ngOnDestroy(): void {
    if (this.player) {
      this.player.destroy();
    }
  }

  private trackProgress(): void {
    if (this.player && !this.hasCountedView) {
      const watchedPercentage = (this.player.currentTime / this.player.duration) * 100;

      console.log(`Watched percentage: ${watchedPercentage.toFixed(2)}%`);

      if (watchedPercentage >= 0) {
        console.log('Threshold reached. Incrementing view count.');
        this.incrementViewCount();
        this.hasCountedView = true; // Ensure view is counted only once
      }
    }
  }

  private incrementViewCount(): void {
    const apiUrl = `http://localhost:3000/episodes/${this.episodeId}/views`; // Use dynamic episodeId
    this.http.post(apiUrl, {}).subscribe({
      next: (response) => console.log('View counted:', response),
      error: (error) => console.error('Error counting view:', error),
    });
  }
}