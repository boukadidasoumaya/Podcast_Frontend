import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { DecimalPipe } from '@angular/common';
@Component({
  selector: 'app-episode-horizontal',
  standalone: true,
  imports: [DecimalPipe],
  templateUrl: './episode-horizontal.component.html',
  styleUrl: './episode-horizontal.component.css'
})
export class EpisodeHorizontalComponent {
  @Input() imageUrl: string = '';
  @Input() title: string = '';
  @Input() episodeDuration: string = '';
  @Input() episodeNumber: number = 0;
  @Input() hostName: string = '';
  @Input() hostImage: string = '';
  @Input() hostRole: string = '';
  @Input() description: string = '';
  @Input() stats: { headphones: number, heart: number, chat: number, download: number } = {
    headphones: 0,
    heart: 0,
    chat: 0,
    download: 0
  };
}

