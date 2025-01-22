import { Component } from '@angular/core';
import { AfterViewInit, ElementRef, OnDestroy } from '@angular/core';
import Plyr from 'plyr';
@Component({
  selector: 'app-vid-player',
  standalone: true,
  imports: [],
  templateUrl: './vid-player.component.html',
  styleUrl: './vid-player.component.css'
})
export class VidPlayerComponent implements AfterViewInit, OnDestroy {
  private player: Plyr | undefined;

  constructor(private elRef: ElementRef) {}

  ngAfterViewInit(): void {
    const videoElement = this.elRef.nativeElement.querySelector('#player');
    if (videoElement) {
      this.player = new Plyr(videoElement, {
        controls: [
          'play',
          'progress',
          'current-time',
          'mute',
          'volume',
          'settings',
          'fullscreen',
        ],
      });
    }
  }

  ngOnDestroy(): void {
    if (this.player) {
      this.player.destroy();
    }
  }
}