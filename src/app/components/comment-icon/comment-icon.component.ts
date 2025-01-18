import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importation de CommonModule

@Component({
  selector: 'app-comment-icon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './comment-icon.component.html',
  styleUrl: './comment-icon.component.css'
})
export class CommentIconComponent {
 // Etat pour savoir si le chat a des commentaires
 isCommented: boolean = false;
 // Compteur de commentaires
 @Input() commentsCount: string = '0';
 @Output() commented = new EventEmitter<boolean>();

 toggleComment() {
   // Permet de basculer l'état de l'icône du chat
   this.isCommented = !this.isCommented;
   this.commented.emit(this.isCommented);

   // Mise à jour du compteur de commentaires
   this.commentsCount = this.isCommented ? (parseInt(this.commentsCount.replace('k', '')) + 1) + 'k' : (parseInt(this.commentsCount.replace('k', '')) - 1) + 'k';
 }
}
