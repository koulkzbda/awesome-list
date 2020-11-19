import { AuthService } from './../../services/auth.service';
import { Subscription } from 'rxjs';
import { User } from './../../../shared/models/user';
import { LayoutService } from './../../services/layout.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

  public homePath = 'home';
  public loginPath = 'login';
  public registerPath = 'register';
  public user: User;
  private subscription: Subscription;

  constructor(
    private router: Router,
    private layoutService: LayoutService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.subscription =
      this.authService.user$.subscribe(user => this.user = user);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public isActive(page: string): boolean {
    return this.router.isActive(page, true);
  }

  public navigate(page: string): void {
    this.router.navigate([page]);
  }

  public toggleSidenav(): void {
    this.layoutService.toggleSidenav();
  }

  public logout(): void {
    this.authService.logout();
  }
}
