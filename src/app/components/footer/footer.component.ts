import { Component } from '@angular/core';
import { FooterSubscribeComponent } from "./footer-subscribe/footer-subscribe.component";
import { FooterContactComponent } from "./footer-contact/footer-contact.component";
import { FooterDownloadComponent } from "./footer-download/footer-download.component";
import { FooterLinksComponent } from "./footer-links/footer-links.component";

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [FooterSubscribeComponent, FooterContactComponent, FooterDownloadComponent, FooterLinksComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

}
