import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { SupportChatComponent } from './pages/support-chat/support-chat.component';
import { ToastService } from './services/toast.service';
import { ToastNotificationComponent } from './components/toast-notification/toast-notification.component';
import { CommonModule } from '@angular/common';
import { CookieComponent } from './components/cookie/cookie.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    MainPageComponent,
    SupportChatComponent,
    ToastNotificationComponent,
    CookieComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'investo-client';

  constructor(public toastService: ToastService) {}
}
