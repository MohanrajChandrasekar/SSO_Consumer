import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { HttpServicesService } from '../services/http-services.service';
import { environment } from '../../environments/environment';
import { debug } from 'console';
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
              private httpService: HttpServicesService) { }

  ngOnInit(): void {
    console.log(this.activateRoute.snapshot.queryParams);
    if (this.activateRoute.snapshot.queryParams.ssoToken) {
      this.ssoToken = this.activateRoute.snapshot.queryParams.ssoToken;
      this.httpService.verifySSO_Token(this.ssoToken).subscribe(res => {
        console.log(res);
        if (res.status === 200) {
          debugger
          this.userDetails = res.response.payLoad;
          localStorage.setItem('token', res.response.token);
          localStorage.setItem('refreshToken', res.response.refreshToken);
        }
      });
    } else {
      console.log('gfg');
      this.document.location.href = environment.apiURL + 'simplesso/login?serviceURL=' + redirestURL;
    }
  }

}
