import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from './services/user.service';
import { map, tap } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  return inject(UserService).getProfile().pipe(
    map((response:any) => response.code == 200 && !!response.data),
    tap(loggedIn => {
      if (!loggedIn) {
        router.navigate(['/auth', 'login'])
      }
    })
  )
};

export const unauthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  return inject(UserService).getProfile().pipe(
    map((response:any) => response.code != 200),
    tap(loggedOut => {
      if (!loggedOut) {
        router.navigate(['/dashboard'])
      }
    }),
  )
}
