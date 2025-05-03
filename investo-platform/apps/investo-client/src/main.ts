import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { appConfig } from './app/app.config';

// Merge the existing providers with provideAnimations
const bootstrapConfig = {
  providers: [
    ...appConfig.providers,
    provideAnimations()
  ]
};

bootstrapApplication(AppComponent, bootstrapConfig)
  .catch(err => console.error(err));
