import { Component, Input } from '@angular/core';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-password-strength-meter',

  standalone: true,

  imports: [CommonModule],

  templateUrl: './password-strength-meter.component.html',

  styleUrls: ['./password-strength-meter.component.css'],
})
export class PasswordStrengthMeterComponent {
  @Input()
  password = '';

  get score(): number {
    let score = 0;

    if (this.password.length >= 8) score++;

    if (/[A-Z]/.test(this.password)) score++;

    if (/[a-z]/.test(this.password)) score++;

    if (/\d/.test(this.password)) score++;

    if (/[^A-Za-z0-9]/.test(this.password)) score++;

    return score;
  }

  get strength(): string {
    if (this.score <= 2) return 'Weak';

    if (this.score <= 4) return 'Medium';

    return 'Strong';
  }
}
