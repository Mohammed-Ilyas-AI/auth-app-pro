import { Injectable, signal, computed } from '@angular/core';
import { User } from '../models/user.model';
import { LoginRequest } from '../models/login-request.model';
import { RegisterRequest } from '../models/register-request.model';
import { StorageService } from './storage.service';
import { STORAGE_KEYS } from '../constants/storage-keys';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly currentUser = signal<User | null>(null);

  readonly isAuthenticated = computed(() => this.currentUser() !== null);

  readonly isLoading = signal(false);

  constructor(private readonly storageService: StorageService) {
    this.restoreSession();
  }

  register(request: RegisterRequest): {
    success: boolean;
    message: string;
  } {
    const users = this.storageService.getItem<User[]>(STORAGE_KEYS.USERS) || [];

    const existingUser = users.find(
      (user) => user.email.toLowerCase() === request.email.toLowerCase(),
    );

    if (existingUser) {
      return {
        success: false,
        message: 'User already exists',
      };
    }

    const newUser: User = {
      id: crypto.randomUUID(),
      fullName: request.fullName,
      email: request.email,
      password: request.password,
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);

    this.storageService.setItem(STORAGE_KEYS.USERS, users);

    return {
      success: true,
      message: 'Registration successful',
    };
  }

  login(request: LoginRequest): {
    success: boolean;
    message: string;
    user?: User;
  } {
    const users = this.storageService.getItem<User[]>(STORAGE_KEYS.USERS) || [];

    const user = users.find(
      (item) =>
        item.email.toLowerCase() === request.email.toLowerCase() &&
        item.password === request.password,
    );

    if (!user) {
      return {
        success: false,
        message: 'Invalid email or password',
      };
    }

    const updatedUser: User = {
      ...user,
      lastLogin: new Date().toISOString(),
    };

    const updatedUsers = users.map((item) => (item.id === updatedUser.id ? updatedUser : item));

    this.storageService.setItem(STORAGE_KEYS.USERS, updatedUsers);

    this.currentUser.set(updatedUser);

    if (request.rememberMe) {
      this.storageService.setItem(STORAGE_KEYS.CURRENT_USER, updatedUser);
    }

    return {
      success: true,
      message: 'Login successful',
      user: updatedUser,
    };
  }

  logout(): void {
    this.currentUser.set(null);

    this.storageService.removeItem(STORAGE_KEYS.CURRENT_USER);
  }

  restoreSession(): void {
    const savedUser = this.storageService.getItem<User>(STORAGE_KEYS.CURRENT_USER);

    if (savedUser) {
      this.currentUser.set(savedUser);
    }
  }

  getCurrentUser(): User | null {
    return this.currentUser();
  }

  getUsers(): User[] {
    return this.storageService.getItem<User[]>(STORAGE_KEYS.USERS) || [];
  }
}
