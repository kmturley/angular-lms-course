import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { ApiService } from '../shared/api.service';

export class Page {
  name: string;
  slug: string;
}

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {
  public page: Page;

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.api.get('/assets/json/navigation.json', 'pages').subscribe(pages => {
        this.page = pages.filter((page: Page) => {
          return page.name === data.name;
        })[0];
      });
    });
  }

}
