import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appTilt]',
  standalone: true,
})
export class TiltDirective {
  constructor(private elementRef: ElementRef) {}

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    const card = this.elementRef.nativeElement;

    const rect = card.getBoundingClientRect();

    const x = event.clientX - rect.left;

    const y = event.clientY - rect.top;

    const centerX = rect.width / 2;

    const centerY = rect.height / 2;

    const rotateY = ((x - centerX) / centerX) * 12;

    const rotateX = -((y - centerY) / centerY) * 12;

    card.style.transform = `
      perspective(1500px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale3d(1.03,1.03,1.03)
    `;
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    const card = this.elementRef.nativeElement;

    card.style.transform = `
      perspective(1500px)
      rotateX(0deg)
      rotateY(0deg)
      scale3d(1,1,1)
    `;
  }
}
