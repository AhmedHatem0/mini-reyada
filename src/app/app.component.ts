import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { NavbarComponent } from "./components/shared/navbar/navbar.component";
import { AuthService } from './services/auth-svc/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'mini-reyada';
  private authSVC = inject(AuthService);
  
  ngOnInit(){
    this.authSVC.autoLogin();
  }
}
