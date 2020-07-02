import { Component } from '@angular/core';
import { HttpServicesService } from './services/http-services.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sso';
  constructor(private service: HttpServicesService,
              private cookies: CookieService) {
    console.log('app loads..');
    this.cookies.set('globelSessionID', localStorage.getItem('globalSessionID'));
  }
}
