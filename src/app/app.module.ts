import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { forkJoin } from 'rxjs';

import { ApiService } from './shared/api.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';

export function init(apiService: ApiService) {
  return () => new Promise((resolve, reject) => {
    apiService.get('assets/json/locales.json', 'locales').subscribe((locales) => {
      const observables = [];
      locales.forEach((locale) => {
        observables.push(apiService.get(`assets/json/${locale.path}/pages.json`, `pages`));
      });
      forkJoin(observables).subscribe((localePages) => {
        resolve(localePages);
      });
    }, (err) => {
      reject(err);
    });
  });
}

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: init,
      deps: [ApiService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
