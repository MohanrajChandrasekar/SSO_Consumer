import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpServicesService } from '../services/http-services.service';
const redirectURL = 'http://localhost:4200/dashboard';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  isVerifiedURL = false;

  constructor(private fb: FormBuilder,
    private router: Router,
    private httpService: HttpServicesService) {
    this.loginForm = this.fb.group({
      loginId: new FormControl('', Validators.required),
      password: new FormControl('', Validators.compose([
        Validators.required,
      ]))
    });
  }

  ngOnInit(): void {
    this.httpService.preLogin(redirectURL).subscribe(res => {
      console.log(res);
      if (res.status === 200) {
        this.isVerifiedURL = true;
      } else {
        this.isVerifiedURL = false;
      }
    });
  }

  doLogin() {
    const obj = Object.assign(this.loginForm.value);
    console.log(obj);
    const object = {
      email: this.loginForm.value.loginId,
      password: this.loginForm.value.password,
      serviceURL: this.isVerifiedURL ? redirectURL : null
    };
    this.httpService.doLogin(object).subscribe(res => {
      console.log(res);
      if (res.status === 200) {
        this.router.navigate(['/dashboard'], { queryParams: { ssoToken: res.ssoToken } });
        localStorage.setItem('sessionUser', res.sessionUser);
      }
    });
  }

}
