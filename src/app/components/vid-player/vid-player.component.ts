import { Component, AfterViewInit, OnDestroy, ElementRef, Input, OnInit } from '@angular/core';
import Plyr from 'plyr';
import { SocketService } from '../../services/views.service';
@Component({
  selector: 'app-vid-player',
  standalone: true,
  templateUrl: './vid-player.component.html',
  styleUrls: ['./vid-player.component.css'],
})
export class VidPlayerComponent implements OnInit,AfterViewInit, OnDestroy {
  private player: Plyr | undefined;
  private hasCountedView = false;

  @Input() filepath!: string; // Episode file path
  @Input() episodeId!: number; // Episode ID from the backend

  constructor(
    private elRef: ElementRef,
    private viewCountService: SocketService // Inject the service
  ) {}
  ngOnInit(): void {
    this.incrementViewCount()

  }

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
      const watchedPercentage = (this.player.currentTime / this.player.duration) * 100;

      if (watchedPercentage >= 0) {
        this.incrementViewCount();
        this.hasCountedView = true; // Ensure view is counted only once
      }
    }
  }
  

  private incrementViewCount(): void {
    // Use the ViewCountService to increment the view count
    this.viewCountService.sendViewUpdate(this.episodeId);

  }
}