import { Component } from '@angular/core';
import { ContactFormComponent } from "./contact-form/contact-form.component";
import { MapComponent } from "./map/map.component";
import { ContactInfoComponent } from "./contact-info/contact-info.component";
import { FooterComponent } from '../../components/footer/footer.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ContactFormComponent, MapComponent, ContactInfoComponent, NavbarComponent, FooterComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {

}
