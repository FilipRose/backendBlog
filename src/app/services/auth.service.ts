import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoggedInGuard: boolean = false;
  user: any = null;

  constructor(
    private _afAuth: AngularFireAuth,
    private _toastr: ToastrService,
    private _router: Router
  ) {}

  loginAuth(email, password) {
    this._afAuth
      .signInWithEmailAndPassword(email, password)
      .then((logRef) => {
        this.loadUser();
        this._toastr.success('Logged in successfully!');
        this.loggedIn.next(true);
        this._router.navigate(['/']);
        this.isLoggedInGuard = true;
      })
      .catch((e) => {
        this._toastr.warning(e);
      });
  }

  loadUser() {
    this._afAuth.authState.subscribe((user) => {
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
      }
    });
  }

  logOut() {
    this._afAuth.signOut().then(() => {
      this._toastr.success('User logged out successfully!');
      localStorage.removeItem('user')
      this.user = null;
      this.loggedIn.next(false);
      this._router.navigate(['/login']);
      this.isLoggedInGuard = false;
    });
  }

  isLogIn() {
    return this.loggedIn.asObservable();
  }

  getUser() {
    return this.user;
  }


}


