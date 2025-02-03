import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SubscribeService } from '../../../services/subscribe.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-footer-subscribe',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './footer-subscribe.component.html',
  styleUrls: ['./footer-subscribe.component.css'],
})
export class FooterSubscribeComponent {
  email: string = '';

  constructor(private subscribeService: SubscribeService , private toastr:ToastrService) {}

  onSubmit() {
    if (!this.email) return;

    this.subscribeService.subscribe(this.email).subscribe({
      next: (response) => {
        this.toastr.success("yaaaa")        
        this.email = ''; 
      },
      error: (err) => {
        this.toastr.error("aahhaaa") 
      },
    });
  }
}
