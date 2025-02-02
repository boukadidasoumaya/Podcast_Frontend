import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { Episode } from '../../interfaces/app.interfaces';
import { EpisodeService } from '../../services/episode.service';

@Component({
  selector: 'app-subscribe-button',
  standalone: true,
  imports: [],
  templateUrl: './subscribe-button.component.html',
  styleUrls: ['./subscribe-button.component.css']
})
export class SubscribeButtonComponent {
  isSubscribed = false;
  constructor(private httpclient: HttpClient,private episodeservice :EpisodeService){}

  @Input() episode!:Episode;

  toggleSubscribe(episode : Episode): void {
    const url="http://localhost:3000/subscribe/:podcastid";
    const sub=this.episodeservice.subscription(episode.podcast.id);
    if(!sub){
      this.episodeservice.unsubscription(episode.podcast.id);
    }
    this.isSubscribed = !this.isSubscribed;
  }
}
