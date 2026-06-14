import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  templateUrl: './theme-toggle.component.html',
  styleUrl: './theme-toggle.component.css',
})
export class ThemeToggleComponent {

  readonly darkMode =
    signal(true);

  toggleTheme(): void {

    this.darkMode.update(v => !v);

    document.documentElement.classList.toggle(
      'dark'
    );
  }
}
