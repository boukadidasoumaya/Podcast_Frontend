import { Component } from '@angular/core';
import { SectionCustomComponent } from "../section-custom/section-custom.component";

@Component({
  selector: 'app-swiper',
  standalone: true,
  imports: [SectionCustomComponent],
  templateUrl: './swiper.component.html',
  styleUrl: './swiper.component.css'
})
export class SwiperComponent {

}
