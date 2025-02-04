import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Episode } from '../../../../interfaces/app.interfaces';
import { EpisodeService } from '../../../../services/episode.service';
import { SubscriptionService } from '../../../../services/subscription.service';
@Component({
  selector: 'app-subscribe-button',
  standalone: true,
  imports: [],
  templateUrl: './subscribe-button.component.html',
  styleUrls: ['./subscribe-button.component.css']
})
export class SubscribeButtonComponent {
  @Input() isSubscribed =false;
  @Input() episode!:Episode;
  @Input() subscribedEpisodess:{ [episodeId: number]: boolean } = {}

  subscribedEpisodes: { [episodeId: number]: boolean } = {};

  @Output() subchange= new EventEmitter<void>();
  @Output() subchange2= new EventEmitter<void>();


  constructor(private httpclient: HttpClient,private episodeservice :EpisodeService,
    private subscriptionservice: SubscriptionService
  ){}

  ngOnInit(){
    this.subscriptionservice.getsubscribedEpisodesByUser().subscribe((subscribedEpisodes) => {
      subscribedEpisodes.forEach((episode) => {
        if(episode.id==this.episode.id){
        this.subscribedEpisodes[episode.id] = true;
        this.isSubscribed = true;}
      });
    });
    // this.isSubscribed = this.subscribedEpisodess[this.episode.id] || false;

    console.log('subscribed', this.subscribedEpisodes);
  }

  ngOnChanges(){

      this.isSubscribed = this.subscribedEpisodess[this.episode.id] || false;


  }

  toggleSubscribe(episode : Episode): void {
    const sub=this.episodeservice.subscription(episode.podcast);
    if(this.isSubscribed==false){
      this.episodeservice.subscription(episode.podcast).subscribe({
        next: (data) => {
          console.log('subscribed');
          this.subchange.emit();
      }});
    }else{
      this.episodeservice.unsubscription(episode.podcast).subscribe({
        next: (data) => {
          console.log('unsubscribed');
          this.subchange2.emit();

      }});

    }
    console.log("subscribed episodes",this.subscribedEpisodess)
    this.isSubscribed = !this.isSubscribed;

  }
}

