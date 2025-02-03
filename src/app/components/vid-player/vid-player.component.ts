import { Component, AfterViewInit, OnDestroy, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import Plyr from 'plyr';
import { SocketService } from '../../services/views.service';

@Component({
  selector: 'app-vid-player',
  standalone: true,
  templateUrl: './vid-player.component.html',
  styleUrls: ['./vid-player.component.css'],
})
export class VidPlayerComponent implements AfterViewInit, OnDestroy, OnChanges {
  private player!: Plyr;
  private hasCountedView = false;

  @Input() filepath!: string; // Video file path
  @Input() episodeId!: number; // Episode ID

  constructor(private elRef: ElementRef, private viewCountService: SocketService) {}

  ngAfterViewInit(): void {
    this.initializePlayer();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['filepath'] && !changes['filepath'].firstChange) {
      console.log('Filepath changed, updating video player:', this.filepath);
      this.updateVideoSource();
    }
  }

  private initializePlayer(): void {
    const videoElement = this.elRef.nativeElement.querySelector('#player') as HTMLVideoElement;
    if (videoElement) {
      this.player = new Plyr(videoElement, {
        controls: ['play', 'progress', 'current-time', 'mute', 'volume', 'settings', 'fullscreen'],
        fullscreen: { enabled: true, fallback: true, iosNative: true },
        settings: ['quality', 'speed', 'loop'],
      });

      this.player.on('timeupdate', () => this.trackProgress());
    }
  }

  private updateVideoSource(): void {
    if (this.player) {
      this.player.stop(); // Stop the current video
      this.player.source = {
        type: 'video',
        sources: [{ src: this.filepath, type: 'video/mp4' }]
      };
      this.player.play(); // Auto-play new video (optional)
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

      if (watchedPercentage >= 10) { // Example: Track after 10% watched
        this.incrementViewCount();
        this.hasCountedView = true;
      }
    }
  }

  private incrementViewCount(): void {
    this.viewCountService.sendViewUpdate(this.episodeId);
  }
}
