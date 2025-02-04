import { Component, EventEmitter, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importation de CommonModule

@Component({
  selector: 'app-heart-icon',
  templateUrl: './heart-icon.component.html',
  styleUrls: ['./heart-icon.component.css'],
  standalone: true,
  imports: [CommonModule] // Ajout de CommonModule ici
})
export class HeartIconComponent {
  @Input() isLiked!: boolean;
  @Input() numberOfLikes!: number;
  @Input() authorisedToLike!:boolean;
  @Output() liked = new EventEmitter<boolean>();
  constructor(){
    console.log(this.authorisedToLike);

  }
  toggleLike() {
    this.isLiked = !this.isLiked;
    this.liked.emit(this.isLiked);
    
  }
  canLike(){
    if(this.authorisedToLike){
      this.toggleLike();
    }
    else{
      return
    }
  }
}
