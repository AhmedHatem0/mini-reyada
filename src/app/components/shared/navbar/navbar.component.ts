import { Component, DestroyRef, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth-svc/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  private router  = inject(Router);
  private authSVC = inject(AuthService);
  private destroyRef = inject(DestroyRef);
  isAuthenticated = false;
  


  ngOnInit() {
    this.handleUserSubscription();
  }

  // navigateTo(dest: string) {
  //   if(this.isAuthenticated){
  //     this.router.navigate([dest]);
  //     return;
  //   }
  //   alert("please login first");
  // }

  onLogout() {
    this.authSVC.logout();
  }

  private handleUserSubscription() {
    const Subscription = this.authSVC.user.subscribe((user) => {
      this.isAuthenticated = !!user;
    });
    this.destroyRef.onDestroy(() => {
      Subscription.unsubscribe();
    });
  }
}
