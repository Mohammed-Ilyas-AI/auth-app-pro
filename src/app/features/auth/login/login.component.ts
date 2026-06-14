import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../../core/services/auth.service';

import { AuroraBackground } from '../../../shared/components/aurora-background/aurora-background.component';

import { ThemeToggleComponent } from '../../../shared/components/theme-toggle/theme-toggle.component';

import { FloatingParticlesComponent } from '../../../shared/components/floating-particles/floating-particles.component';
import { MouseSpotlightComponent } from '../../../shared/components/mouse-spotlight/mouse-spotlight.component';
import { TiltDirective } from '../../../shared/directives/tilt.directive';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    AuroraBackground,
    ThemeToggleComponent,
    FloatingParticlesComponent,
    MouseSpotlightComponent,
    TiltDirective,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  showPassword = false;

  errorMessage = '';

  buttonText = 'Initialize Neural Link';

  buttonState: 'idle' | 'scanning' | 'authenticating' | 'linking' | 'success' = 'idle';

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

    this.buttonState = 'scanning';

    this.buttonText = 'Scanning Identity...';

    setTimeout(() => {
      this.buttonState = 'authenticating';

      this.buttonText = 'Authenticating...';
    }, 800);

    setTimeout(() => {
      this.buttonState = 'linking';

      this.buttonText = 'Establishing Neural Link...';
    }, 1600);

    const { email, password } = this.loginForm.getRawValue();

    this.authService.login(email, password).subscribe({
      next: () => {
        this.buttonState = 'success';

        this.buttonText = '✓ ACCESS GRANTED';

        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 1200);
      },

      error: (error) => {
        this.buttonState = 'idle';

        this.buttonText = 'Initialize Neural Link';

        this.errorMessage = error?.message || 'Authentication failed';
      },
    });
  }
}
