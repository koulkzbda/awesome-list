import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-banner',
  templateUrl: './home-banner.component.html',
  styleUrls: ['./home-banner.component.scss']
})
export class HomeBannerComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  nagivateToDashboard(): void {
    this.router.navigate(['/app/dashboard']);
  }

}
