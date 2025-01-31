import { Component, EventEmitter, Input, Output } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Comment } from '../../../interfaces/app.interfaces';
import { CommentService } from '../../../services/comment.service';

@Component({
  selector: 'app-reply-form',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './reply-form.component.html',
  styleUrl: './reply-form.component.css'
})
export class ReplyFormComponent  {
  @Output() onDataReceived = new EventEmitter<string>();

  replyText: string = '';
  token: string  = "gfgd";
  imageUrl: string = 'asset/images/';
  user: any;

  handleSubmit(event:Event): void {
    if (this.replyText.trim()) {
      this.onDataReceived.emit(this.replyText); // Émet la valeur de replyText
      this.replyText = ''; // Réinitialise le champ après l'envoi
    }
  }

}

