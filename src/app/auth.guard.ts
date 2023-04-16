import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(): boolean {
    console.log('Checking if user is logged in...');
    if (localStorage.getItem('isLoggedIn') === 'true') {
      console.log('User is logged in!');
      return true;
    } else {
      console.log('User is not logged in. Redirecting to login page...');
      this.router.navigate(['/login']);
      return false;
    }
  }
}
