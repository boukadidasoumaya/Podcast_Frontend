import { Component } from '@angular/core';
import { AfterViewInit, ElementRef, OnDestroy } from '@angular/core';
import Plyr from 'plyr';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Input } from '@angular/core';
import { SectionCustomComponent } from "../section-custom/section-custom.component";
@Component({
  selector: 'app-vid-player',
  imports: [HttpClientModule, SectionCustomComponent],
  standalone: true,
  templateUrl: './vid-player.component.html',
  styleUrl: './vid-player.component.css'
})
  
export class VidPlayerComponent implements AfterViewInit, OnDestroy {
  private player: Plyr | undefined;
  private hasCountedView = false;
 // Episode ID from the backend

  constructor(private elRef: ElementRef, private http: HttpClient) {}

  ngAfterViewInit(): void {
    const videoElement = this.elRef.nativeElement.querySelector('#player');
    if (videoElement) {
      this.player = new Plyr(videoElement, {
        controls: ['play', 'progress', 'current-time', 'mute', 'volume', 'settings', 'fullscreen'],
        fullscreen: { enabled: true, fallback: true, iosNative: true },
        settings: ['quality', 'speed', 'loop'],

      });

      // Listen for the 'timeupdate' event to track progress
      this.player.on('timeupdate', () => {
        console.log('working')
        this.trackProgress();
      });
    }
  }

  ngOnDestroy(): void {
    if (this.player) {
      this.player.destroy();
    }
  }

  private trackProgress(): void {
    if (this.player && !this.hasCountedView) {
      console.log('hhh')
      const watchedPercentage =
        (this.player.currentTime / this.player.duration) * 100;

      if (watchedPercentage >= 0) {
        this.incrementViewCount();
        this.hasCountedView = true; // Ensure view is counted only once
      }
    }
  }

  private incrementViewCount(): void {
    const apiUrl = `http://localhost:3000/episodes/1/views`; // Adjust the URL as per your backend
    this.http.post(apiUrl, {}).subscribe({
      next: (response) => console.log('View counted:', response),
      error: (error) => console.error('Error counting view:', error),
    });
  }
}