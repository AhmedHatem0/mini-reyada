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
    const user = window.localStorage.getItem('userData');
    if(user){
        return of(true);
    }
    return of(this.router.createUrlTree(['/auth']));



    // console.log(!!this.authService.user);
    // console.log(this.authService.user);

    // return this.authService.user.pipe(
    //   take(1),
    //   tap((user) => {
    //     console.log("user in guard",user);
    //   }),
    //   map((user) => {
    //     console.log(user);
    //     const isAuth = !!user;
    //     console.log(isAuth);
    //     if (isAuth) {
    //       return true;
    //     } else {
    //       return this.router.createUrlTree(['/auth']);
    //     }
    //   })
    // );
  }
}
