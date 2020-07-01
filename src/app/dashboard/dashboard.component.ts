import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { HttpServicesService } from '../services/http-services.service';
import { environment } from '../../environments/environment';
const redirestURL = 'http://localhost:4200/dashboard';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public ssoToken: any;
  userDetails: any;

  constructor(@Inject(DOCUMENT) private document: Document,
    private activateRoute: ActivatedRoute,
    private route: Router,
    private httpService: HttpServicesService) { }

  ngOnInit(): void {
    debugger
    console.log(this.activateRoute.snapshot.queryParams);
    if (this.activateRoute.snapshot.queryParams.ssoToken) {
      this.ssoToken = this.activateRoute.snapshot.queryParams.ssoToken;
      this.verifySSO();
    } else {
      // this.document.location.href = environment.apiURL + 'simplesso/login?serviceURL=' + redirestURL;

      console.log(JSON.stringify(localStorage.getItem('sessionUser')));
      const sessionUser = localStorage.getItem('sessionUser');
      if (sessionUser === null) {
        this.route.navigateByUrl('/login');
      } else {
        this.httpService.getSSO_Token(redirestURL, sessionUser).subscribe(res => {
          console.log(res);
          if (res.status === 200) {
            this.ssoToken = res.ssoToken;
            this.verifySSO();
          }
        });
      }
    }
  }

  verifySSO() {
    this.httpService.verifySSO_Token(this.ssoToken).subscribe(res => {
      console.log(res);
      if (res.status === 200) {
        this.userDetails = res.response.payLoad;
        localStorage.setItem('token', res.response.token);
        localStorage.setItem('refreshToken', res.response.refreshToken);
      }
    });
  }

}
