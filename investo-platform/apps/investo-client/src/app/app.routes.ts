import { Routes } from '@angular/router';
import { InvestNowPageComponent } from './pages/invest-now-page/invest-now-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { RealEstateDetailsComponent } from './pages/real-estate-details/real-estate-details.component';
import { RealEstateFormComponent } from './pages/real-estate-form/real-estate-form.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ConnectWalletComponent } from './pages/connect-wallet/connect-wallet.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { PasswordResetComponent } from './pages/password-reset/password-reset.component';
import { authGuard } from './guards/auth.guard';
import { RealEstatesPageComponent } from './pages/real-estates-page/real-estates-page.component';
import { AboutComponent } from './pages/about/about.component';

export const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'realestate/details/:id', component: RealEstateDetailsComponent },
  { 
    path: 'realestate/invest/:id', 
    component: InvestNowPageComponent,
    canActivate: [() => authGuard()]
  },
  { path: 'realestate/add', component: RealEstateFormComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'password-reset', component: PasswordResetComponent },
  { 
    path: 'profile/:id', 
    component: ProfileComponent,
    canActivate: [() => authGuard()]
  },
  { 
    path: 'connect-wallet', 
    component: ConnectWalletComponent,
    canActivate: [() => authGuard()]
  },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'state-page', component: RealEstatesPageComponent },
  { path: 'about', component: AboutComponent },
  { path: '**', redirectTo: '' }
];
