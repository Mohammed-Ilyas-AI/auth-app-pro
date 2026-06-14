import {
  Component,
  HostListener
} from '@angular/core';

@Component({
  selector: 'app-mouse-spotlight',
  standalone: true,
  templateUrl: './mouse-spotlight.component.html',
  styleUrl: './mouse-spotlight.component.css'
})
export class MouseSpotlightComponent {

  x = 0;
  y = 0;

  @HostListener('document:mousemove', ['$event'])
  onMove(event: MouseEvent): void {

    this.x = event.clientX;
    this.y = event.clientY;

    document.documentElement.style.setProperty(
      '--mouse-x',
      `${this.x}px`
    );

    document.documentElement.style.setProperty(
      '--mouse-y',
      `${this.y}px`
    );
  }
}