import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { AuthService } from '../../core/services/auth.service';
import { ThemeService } from '../../core/services/theme.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  readonly authService = inject(AuthService);

  readonly themeService = inject(ThemeService);

  private readonly router = inject(Router);

  logout(): void {
    this.authService.logout();

    this.router.navigate(['/login']);
  }
}
