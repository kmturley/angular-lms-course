import { ActivatedRoute } from '@angular/router';
import { Component, HostBinding, OnInit } from '@angular/core';
import { trigger, stagger, animate, style, query, transition } from '@angular/animations';

import { ApiService } from '../shared/api.service';

export class Page {
  data: {
    name: string;
    description: string;
    bgImage: string;
    pathNext: string;
    pathPrev: string;
  };
  path: string;
  type: string;
}

export const pageTransition = trigger('pageTransition', [
  transition(':enter', [
    query('.panel', style({ opacity: 0 }), { optional: true }),
    query('.panel', stagger(300, [
      style({ transform: 'translateY(100px)' }),
      animate('500ms cubic-bezier(.75,-0.48,.26,1.52)', style({transform: 'translateY(0px)', opacity: 1})),
    ]), { optional: true }),
  ]),
  transition(':leave', [
    query('.panel', stagger(300, [
      style({ transform: 'translateY(0px)', opacity: 1 }),
      animate('500ms cubic-bezier(.75,-0.48,.26,1.52)', style({transform: 'translateY(100px)', opacity: 0})),
    ]), { optional: true }),
  ])
]);

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
  animations: [ pageTransition ],
})
export class PageComponent implements OnInit {
  @HostBinding('@pageTransition') transition = '';
  public page: Page;

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.data.subscribe((routeData) => {
      this.api.get('assets/json/navigation.json', 'pages').subscribe(pages => {
        this.page = pages.filter((page: Page) => {
          return page.data.name === routeData.name;
        })[0];
      });
    });
  }

}
