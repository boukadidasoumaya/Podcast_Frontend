import { Component } from '@angular/core';
import { ContactFormComponent } from "./contact-form/contact-form.component";
import { MapComponent } from "./map/map.component";
import { ContactInfoComponent } from "./contact-info/contact-info.component";
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ContactFormComponent, MapComponent, ContactInfoComponent, NavbarComponent, FooterComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {

}
