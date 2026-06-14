import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../../core/services/auth.service';
import { TiltDirective } from '../../../shared/directives/tilt.directive';
import { MouseSpotlightComponent } from '../../../shared/components/mouse-spotlight/mouse-spotlight.component';
import { FloatingParticlesComponent } from '../../../shared/components/floating-particles/floating-particles.component';
import { ThemeToggleComponent } from '../../../shared/components/theme-toggle/theme-toggle.component';
import { AuroraBackground } from '../../../shared/components/aurora-background/aurora-background.component';

@Component({
  selector: 'app-register',
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
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  registerForm!: FormGroup;

  showPassword = false;

  showConfirmPassword = false;

  errorMessage = '';

  successMessage = '';

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],

      email: ['', [Validators.required, Validators.email]],

      password: ['', [Validators.required, Validators.minLength(8)]],

      confirmPassword: ['', Validators.required],
    });
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  onSubmit(): void {
    this.errorMessage = '';
    this.successMessage = '';

    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const { fullName, email, password, confirmPassword } = this.registerForm.getRawValue();

    if (password !== confirmPassword) {
      this.errorMessage = 'Password and Confirm Password must match';
      return;
    }

    const result = this.authService.register({
      fullName,
      email,
      password,
    });

    if (!result.success) {
      this.errorMessage = result.message;
      return;
    }

    this.successMessage = result.message;

    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 1500);
  }
}
