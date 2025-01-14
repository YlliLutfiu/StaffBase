import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
// import { provideHttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    ...(appConfig.providers || []),
    // provideHttpClient(), // Correctly include provideHttpClient
  ],
}).catch((err) => console.error(err));
