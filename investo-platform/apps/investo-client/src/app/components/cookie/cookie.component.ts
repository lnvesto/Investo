import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CookieService } from '../../services/cookie.service';

@Component({
  selector: 'app-cookie',
  templateUrl: './cookie.component.html',
  styleUrls: ['./cookie.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class CookieComponent implements OnInit {
  showCookieNotice = false;
  cookieConsentKey = 'cookie-consent';

  constructor(private cookieService: CookieService) { }

  ngOnInit() {
    this.showCookieNotice = !this.cookieService.getCookie(this.cookieConsentKey);
  }

  acceptCookies(): void {
    this.cookieService.setCookie(this.cookieConsentKey, 'accepted', 365); 
    this.showCookieNotice = false;
  }

  managePreferences(): void {


    this.showCookieNotice = false;
  }
}
