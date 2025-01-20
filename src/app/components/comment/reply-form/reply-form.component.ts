import { Component, EventEmitter, Input, Output } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reply-form',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './reply-form.component.html',
  styleUrl: './reply-form.component.css'
})
export class ReplyFormComponent  {
  @Input() parentCommentId!: number;
  @Output() onDataReceived = new EventEmitter<void>();

  replyText: string = '';
  token: string  = "gfgd";
  imageUrl: string = 'assets/images/profile/exemple.jpg';
  user: any;

  // constructor(
  //   private http: HttpClient
  // ) {}

  // ngOnInit(): void {
  //   // Récupérer l'utilisateur depuis le service d'authentification
  //   this.user = this.getCurrentUser();
  //   if (this.user?.image) {
  //     this.imageUrl = `http://localhost:5000/uploads/${this.user.image}`;
  //   }
  // }

  // getCurrentUser(): any {
  //   // Cette méthode devrait être remplacée par votre logique d'authentification
  //   // Par exemple, en utilisant un service d'authentification
  //   return JSON.parse(localStorage.getItem('user') || '{}');
  // }

  // handleSubmit(event: Event): void {
  //   event.preventDefault();

  //   if (!this.replyText.trim()) {
  //     return;
  //   }

  //   const replyData = {
  //     text: this.replyText,
  //     user_id: this.user?.id,
  //     created_at: new Date(),
  //     parent_id: this.parentCommentId
  //   };

  //   this.http.post('http://localhost:5000/comment/add', replyData)
  //     .subscribe({
  //       next: (response) => {
  //         this.replyText = '';
  //         this.onDataReceived.emit();
  //       },
  //       error: (error) => {
  //         console.error('Error:', error);
  //       }
  //     });
  // }
}

