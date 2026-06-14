import { Injectable, signal } from '@angular/core';
import { Observable, of, delay, tap } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly isLoggedIn = signal(false);

  readonly currentUser =
    signal<User | null>(null);

  readonly isLoading =
    signal(false);

  constructor() {
    this.restoreSession();
  }

  private restoreSession(): void {

    const user =
      localStorage.getItem('auth_user');

    if (user) {

      this.currentUser.set(
        JSON.parse(user)
      );

      this.isLoggedIn.set(true);
    }
  }

  login(
    email: string,
    password: string
  ): Observable<User> {

    this.isLoading.set(true);

    return of({
      id: crypto.randomUUID(),
      email,
      firstName: 'Ilyas'
    }).pipe(

      delay(1000),

      tap(user => {

        localStorage.setItem(
          'auth_user',
          JSON.stringify(user)
        );

        this.currentUser.set(user);

        this.isLoggedIn.set(true);

        this.isLoading.set(false);
      })
    );
  }

  register(
    payload: {
      firstName: string;
      email: string;
      password: string;
    }
  ): Observable<User> {

    this.isLoading.set(true);

    return of({
      id: crypto.randomUUID(),
      firstName: payload.firstName,
      email: payload.email
    }).pipe(

      delay(1000),

      tap(user => {

        localStorage.setItem(
          'auth_user',
          JSON.stringify(user)
        );

        this.currentUser.set(user);

        this.isLoggedIn.set(true);

        this.isLoading.set(false);
      })
    );
  }

  logout(): void {

    localStorage.removeItem(
      'auth_user'
    );

    this.currentUser.set(null);

    this.isLoggedIn.set(false);
  }
}