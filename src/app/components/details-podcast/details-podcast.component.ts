import { Component, OnInit } from '@angular/core';
import { CommentComponent } from '../comment/comment.component';
import { CommonModule } from '@angular/common';
import { SectionCustomComponent } from '../section-custom/section-custom.component';
import { SwiperComponent } from '../swiper/swiper.component';
import { TopicsComponent } from '../topics/topics.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { CardEpisodeWithDetailsComponent } from '../card-episode-with-details/card-episode-with-details.component';
import { CommentService } from '../services/comment.service';

@Component({
  selector: 'app-details-podcast',
  standalone: true,
  imports: [CommonModule, CommentComponent,SectionCustomComponent,SwiperComponent,TopicsComponent,NavbarComponent,CardEpisodeWithDetailsComponent],
  templateUrl: './details-podcast.component.html',
  styleUrl: './details-podcast.component.css'
})
export class DetailsPodcastComponent implements OnInit{
  comments: any[] = []; // Store fetched comments
  episodeId = 15; // Replace with actual episode ID
  podcastId = 1; // Replace with actual podcast ID
  constructor(private commentService: CommentService) {}
  ngOnInit(): void {
    // Request comments for the current podcast and episode
    this.commentService.getComments(this.podcastId, this.episodeId);

    // Subscribe to comments updates
    this.commentService.onComments().subscribe((data) => {
      this.comments = data;
    });

    // Listen for new comments
    this.commentService.onNewComment().subscribe((newComment) => {
      this.comments.push(newComment);
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
// Exemple d'utilisation dans un autre composant
commentData = [
  {
    id: 1,
    username: "John Doe",
    text: "C'est un super commentaire !",
    created_at: "2024-01-19T10:30:00",
    user_image: "assets/images/profile/exemple.jpg",
    replies: [
      {
        id: 2,
        username: "Jane Doe",
        text: "Je suis d'accord !",
        created_at: "2024-01-19T11:00:00",
        user_image: "assets/images/profile/exemple.jpg",
        replies: [
          {
            id: 9,
            username: "Jane Doe",
            text: "Je suis d'accord !",
            created_at: "2024-01-19T11:00:00",
            user_image: "assets/images/profile/exemple.jpg"
          }]
      },
      {
        id: 5,
        username: "Jane Doe",
        text: "Je suis également d'accord !",
        created_at: "2024-01-19T11:00:00",
        user_image: "assets/images/profile/exemple.jpg"
      }
    ]
  },
  {
    id: 3,
    username: "John Doe",
    text: "C'est un autre super commentaire !",
    created_at: "2024-01-19T10:30:00",
    user_image: "assets/images/profile/exemple.jpg",
    replies: [
      {
        id: 4,
        username: "Jane Doe",
        text: "Je suis également d'accord !",
        created_at: "2024-01-19T11:00:00",
        user_image: "assets/images/profile/exemple.jpg"
      }
    ]
  }
];

}
