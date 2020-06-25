import { Component } from '@angular/core';
import { HttpServicesService } from './services/http-services.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sso';
  constructor(private service: HttpServicesService) {
    console.log('app loads..');
  }
}
