import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormsModule,NgForm } from "@angular/forms";
import { UserService } from '../../../services/user.service';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../../store/auth/auth.actions';

@Component({
  selector: 'app-social-media-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './social-media-modal.component.html',
  styleUrl: './social-media-modal.component.css'
})
export class SocialMediaModalComponent {
  @Input() user: any = {};
  @Output() updatedUser = new EventEmitter<any>();
  @Output() onclose = new EventEmitter<void>();
  @Output() onsave = new EventEmitter<void>();
  socialMediaData: {
    whatsapp?: number;
    twitter?: string;
    instagram?: string;
  } = {};

  constructor(
      private userService: UserService,
      private store: Store
    ) {}
  
    ngOnInit(): void {
      this.socialMediaData = {
        whatsapp: this.user?.socialMedia.whatsapp ,
        twitter: this.user?.socialMedia.twitter|| '',
        instagram: this.user?.socialMedia.instagram || ''
      };
  
    }

  onSocialMediaUpdate(form: NgForm): void {
    if (form.valid) {
      const data={
        whatsappUser: this.socialMediaData.whatsapp ,
        twitterUser: this.socialMediaData.twitter || '',
        instagramLink: this.socialMediaData.instagram || '' 
      }
      this.userService.updateUserProfile(data).subscribe({
        next: (response) => {
          this.store.dispatch(AuthActions.updateUser({ user: response }));
          console.log('User info updated successfully:', response);
        }
      });

      this.onsave.emit();
      this.onclose.emit();
    }    }

    closeModal()
    {
      this.onclose.emit();
    }
  }
