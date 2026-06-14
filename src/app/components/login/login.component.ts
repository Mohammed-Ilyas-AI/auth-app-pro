import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../services/auth.service';

import { AuroraBackground } from '../../shared/components/aurora-background/aurora-background';

import { ThemeToggleComponent } from '../../shared/components/theme-toggle/theme-toggle';

import { FloatingParticlesComponent } from '../../shared/components/floating-particales/floating-particles.component';
import { MouseSpotlightComponent } from '../../shared/components/mouse-spotlight/mouse-spotlight.component';
import { TiltDirective } from '../../shared/directives/tilt.directives';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, AuroraBackground, ThemeToggleComponent, FloatingParticlesComponent, MouseSpotlightComponent, TiltDirective ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  showPassword = false;

  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    public authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    this.errorMessage = '';

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { email, password } = this.loginForm.getRawValue();

    this.authService.login(email, password).subscribe({
      next: () => {
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        this.errorMessage = error?.message || 'Authentication failed';
      },
    });
  }
}
