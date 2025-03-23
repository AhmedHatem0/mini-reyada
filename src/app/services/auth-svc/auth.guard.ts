import { inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { AuthService } from './auth.service';
import { map, Observable, of, take, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  authService = inject(AuthService);
  router = inject(Router);

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    // const user = sessionStorage.getItem('userData');
    // if(user){
    //     return of(true);
    // }
    // alert("Please Login First");
    // return of(this.router.createUrlTree(['/auth']));

    return this.authService.user.pipe(
      take(1),
      map((user) => {
        const isAuth = !!user;
        if (isAuth) {
          return true;
        } else {
          alert("Please Login First");
          return this.router.createUrlTree(['/auth']);
        }
      })
    );
  }
}
