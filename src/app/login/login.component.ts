import { Component } from '@angular/core';
import { User } from '../user';
import { USERS } from '../mock-users';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  users = USERS;
  username = '';
  password = '';
  errorMessage = '';
  successMessage = '';

  constructor(private router: Router) { }

  onSubmit() {
    const user = this.users.find(u => u.username === this.username && u.password === this.password);

    if (user) {
      this.successMessage = 'Authentication successful';
      localStorage.setItem('isLoggedIn', 'true');
      this.router.navigate(['/dashboard']);
    } else {
      this.errorMessage = 'Invalid username or password';
    }
  }

}
