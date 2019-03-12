import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
    private apiService: ApiService,
    private router: Router
  ) { }

  ngOnInit() {
    this.pages = this.apiService.data.pages;
    const routes = [];
    this.pages.forEach((page: Page) => {
      routes.push({
        pathMatch: 'full',
        path: page.path,
        loadChildren: `./${page.type}/${page.type}.module#${page.type.charAt(0).toUpperCase() + page.type.slice(1)}Module`,
        data: page.data
      });
    });
    this.router.resetConfig(routes);
  }

}
