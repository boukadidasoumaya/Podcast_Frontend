import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommentComponent } from '../comment/comment.component';
import { CommonModule } from '@angular/common';
import { SectionCustomComponent } from '../section-custom/section-custom.component';
import { SwiperComponent } from '../swiper/swiper.component';
import { TopicsComponent } from '../topics/topics.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { CardEpisodeWithDetailsComponent } from '../card-episode-with-details/card-episode-with-details.component';
import { CommentService } from '../../services/comment.service';
import { Comment } from '../../interfaces/app.interfaces';

@Component({
  selector: 'app-details-podcast',
  standalone: true,
  imports: [CommonModule, CommentComponent,SectionCustomComponent,SwiperComponent,TopicsComponent,NavbarComponent,CardEpisodeWithDetailsComponent],
  templateUrl: './details-podcast.component.html',
  styleUrl: './details-podcast.component.css'
})
export class DetailsPodcastComponent implements OnInit{
  comments: any[] = []; // Store fetched comments
   options={
    "podcast":{
        "id":1
    },
    "episode":{
        "id":2
    }
}
  constructor(private commentService: CommentService) {}

  ngOnInit(): void {
    this.loadComments();
    this.commentService.onNewComment().subscribe((newComment: Comment) => {
      this.comments.push(newComment); // Ajouter le nouveau commentaire à la liste
    });
  }

  loadComments(): void {
    // Récupérer tous les commentaires depuis le service
    this.commentService.getComments(this.options).subscribe((comments: Comment[]) => {
      this.comments = comments;
    });
  }


  episode = {
    imagePath: 'assets/images/podcast/11683425_4790593.jpg',
    title: 'Modern Vintage',
    description: 'What is Content Marketing? If you are wondering what content marketing is all about, this is the place to start.',
    profileImage: 'assets/images/profile/woman-posing-black-dress-medium-shot.jpg',
    profileName: 'Elsa',
    profileRole: 'Influencer',
    duration: '50 Minutes',
    episodeNumber: 15,
    socialLinks: {
      instagram: '#',
      twitter: '#',
      whatsapp: '#'
    }
  };
  displayedEpisodes = [
    {
      title: 'Episode 1',
      image: 'assets/images/podcast/11683425_4790593.jpg',
    },
    {
      title: 'Episode 2 ',
      image: 'assets/images/podcast/11683425_4790593.jpg',

    },
    {
      title: 'Episode 3',
      image: 'assets/images/podcast/11683425_4790593.jpg',
      episodes: 35
    },
    {
      title: 'Episode 4',
      image: 'assets/images/podcast/11683425_4790593.jpg',
      episodes: 35
    },
    {
      title: 'Episode 5',
      image: 'assets/images/podcast/11683425_4790593.jpg',
      episodes: 35
    },

  ];



}
