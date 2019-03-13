import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';

import { ApiService } from '../shared/api.service';
import { Page } from '../page/page.component';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  pages: Array<Page>;

  constructor(
    private api: ApiService,
    private router: Router
  ) { }

  ngOnInit() {
    const routes = [];
    this.api.get('assets/json/locales.json', 'locales').subscribe(locales => {
      console.log('locales', locales);
      const observables = [];
      locales.forEach((locale) => {
        observables.push(this.api.get(`assets/json/${locale.path}/pages.json`, `pages`));
      });
      forkJoin(observables).subscribe(localePages => {
        localePages.forEach((pages) => {
          console.log('pages', pages);
          pages.forEach((page: Page) => {
            routes.push({
              pathMatch: 'full',
              path: page.path,
              loadChildren: `./${page.type}/${page.type}.module#${page.type.charAt(0).toUpperCase() + page.type.slice(1)}Module`,
              data: page.data
            });
          });
        });
        routes.push({
          pathMatch: 'full',
          path: '',
          redirectTo: '/en'
        });
        console.log('routes', routes);
        this.router.resetConfig(routes);
      });
    });
  }
}
