import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _authService: AuthService) {}

  ngOnInit(): void {
    
  }

  submitForm(formValue) {
    this._authService.loginAuth(formValue.email, formValue.password);
  }
}
