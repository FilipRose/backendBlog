import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  userEmail: any;
  isLoggedIn$: Observable<boolean>;

  constructor(private _authService: AuthService, private _afAuth: AngularFireAuth) {
    
  }

  ngOnInit(): void {
    
    this.isLoggedIn$ = this._authService.isLogIn(); 
    this._afAuth.authState.subscribe((user) => {
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        this.userEmail = user.email;
      } else {
        localStorage.removeItem('user');
      }
    });
  }

  logOut() {
    this._authService.logOut();
  }
}

