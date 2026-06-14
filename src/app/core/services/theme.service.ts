import { Injectable, signal } from '@angular/core';
import { StorageService } from './storage.service';
import { STORAGE_KEYS } from '../constants/storage-keys';

export type ThemeMode = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  readonly theme = signal<ThemeMode>('dark');

  constructor(
    private readonly storageService: StorageService
  ) {
    this.initializeTheme();
  }

  initializeTheme(): void {
    const savedTheme =
      this.storageService.getItem<ThemeMode>(STORAGE_KEYS.THEME);

    if (savedTheme) {
      this.theme.set(savedTheme);
    }

    this.applyTheme(this.theme());
  }

  toggleTheme(): void {
    const nextTheme: ThemeMode =
      this.theme() === 'dark'
        ? 'light'
        : 'dark';

    this.setTheme(nextTheme);
  }

  setTheme(theme: ThemeMode): void {
    this.theme.set(theme);

    this.storageService.setItem(
      STORAGE_KEYS.THEME,
      theme
    );

    this.applyTheme(theme);
  }

  private applyTheme(theme: ThemeMode): void {
    const html = document.documentElement;

    if (theme === 'dark') {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  }
}