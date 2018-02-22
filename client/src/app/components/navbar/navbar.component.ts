import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Observable, Observer, Subscriber, Subject, BehaviorSubject, Subscription } from 'rxjs/Rx';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isAuthenticated: boolean;

  constructor(private authService: AuthService, private router: Router) {
    // subscription when user is logged
    this.authService.loggedIn.subscribe((status) => {
      this.isAuthenticated = status;
    });
  }

  ngOnInit() {
  }

  onLogout() {
    this.authService.logout();
    this.router.navigateByUrl('/');
  }
}
