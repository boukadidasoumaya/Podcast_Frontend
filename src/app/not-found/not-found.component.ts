import { Component } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css',
  encapsulation: ViewEncapsulation.None  // Disable view encapsulation

})
export class NotFoundComponent {
  ngAfterViewInit(): void {
    this.drawVisor();
    this.animate();
  }

  drawVisor() {
    const canvas = document.getElementById('visor') as HTMLCanvasElement;
    const ctx = canvas?.getContext('2d');
    
    if (ctx) {  // Check if ctx is not null
      ctx.beginPath();
      ctx.moveTo(5, 45);
      ctx.bezierCurveTo(15, 64, 45, 64, 55, 45);
      ctx.lineTo(55, 20);
      ctx.bezierCurveTo(55, 15, 50, 10, 45, 10);
      ctx.lineTo(15, 10);
      ctx.bezierCurveTo(15, 10, 5, 10, 5, 20);
      ctx.lineTo(5, 45);
      ctx.fillStyle = '#2f3640';
      ctx.strokeStyle = '#f5f6fa';
      ctx.fill();
      ctx.stroke();
    }
  }
  
  animate() {
    const cordCanvas = document.getElementById('cord') as HTMLCanvasElement;
    const ctx = cordCanvas?.getContext('2d');
    
    if (ctx) {  // Check if ctx is not null
      let y1 = 160;
      let y2 = 100;
      let y3 = 100;
      
      let y1Forward = true;
      let y2Forward = false;
      let y3Forward = true;
      
      const animateFrame = () => {
        requestAnimationFrame(animateFrame);
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        ctx.beginPath();
        ctx.moveTo(130, 170);
        ctx.bezierCurveTo(250, y1, 345, y2, 400, y3);
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 8;
        ctx.stroke();
      
        if (y1 === 100) {
          y1Forward = true;
        }
      
        if (y1 === 300) {
          y1Forward = false;
        }
      
        if (y2 === 100) {
          y2Forward = true;
        }
      
        if (y2 === 310) {
          y2Forward = false;
        }
      
        if (y3 === 100) {
          y3Forward = true;
        }
      
        if (y3 === 317) {
          y3Forward = false;
        }
      
        y1Forward ? y1 += 1 : y1 -= 1;
        y2Forward ? y2 += 1 : y2 -= 1;
        y3Forward ? y3 += 1 : y3 -= 1;
      }
      
      animateFrame();
    }
  }
}  