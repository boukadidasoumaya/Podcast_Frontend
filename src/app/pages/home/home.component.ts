import { Component } from '@angular/core';
import { SectionCustomComponent } from '../../components/section-custom/section-custom.component'; 
import { LatestEpisodesComponent } from '../../components/latest-episodes/latest-episodes.component'; 
import { SwiperComponent } from '../../components/swiper/swiper.component'; 
import { TopicsComponent } from '../../components/topics/topics.component';
import { TrendingEpisodesComponent } from "../../components/trending-episodes/trending-episodes.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { HeroSectionComponent } from "../../components/hero-section/hero-section.component";
import { TopicService } from '../../services/topics.service';
import { Topic } from '../../interfaces/app.interfaces';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SectionCustomComponent, SwiperComponent, LatestEpisodesComponent, TopicsComponent, TrendingEpisodesComponent, FooterComponent, NavbarComponent, HeroSectionComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  displayedTopics: Topic[] = [];  // Type is Topic[] to match the interface

  constructor(private topicService: TopicService) {}

  ngOnInit(): void {
    this.topicService.getTopicsWithPodcastCount().subscribe((data) => {
      this.displayedTopics= data;
    console.log('tttttttttttttttttttttttttttttt')
    console.log(this.displayedTopics)
    console.log(this.displayedTopics)
  })}

}
