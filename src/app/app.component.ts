import { AuthService } from './core/services/auth.service';
import { UserService } from './core/services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private userService: UserService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.tryAutoLogin();
  }

  private tryAutoLogin(): void {
    const token = localStorage.getItem('token');
    if (!token) { return; }

    const expirationDate = +localStorage.getItem('expirationDate');
    const now = new Date().getTime();
    if (now >= expirationDate) {
      return;
    }

    const userId = localStorage.getItem('userId');
    this.userService.get(userId, token).subscribe(user => {
      this.authService.autoLogin(user);
    });
  }
}
