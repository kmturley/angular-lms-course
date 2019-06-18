import { sequence, trigger, animate, style, group, query, transition, animateChild } from '@angular/animations';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { ScormService } from './shared/scorm.service';

export const routerTransition = trigger('routerTransition', [
  transition('* => *', [
    query(':enter, :leave', style({ position: 'fixed', width: '100%' }), { optional: true }),
    query(':enter', style({ transform: 'translateX(100%)' }), { optional: true }),
    sequence([
      query(':leave', animateChild(), { optional: true }),
      group([
        query(':leave', [
          style({ transform: 'translateX(0%)' }),
          animate('500ms cubic-bezier(.75,-0.48,.26,1.52)',
            style({ transform: 'translateX(-100%)' }))
        ], { optional: true }),
        query(':enter', [
          style({ transform: 'translateX(100%)' }),
          animate('500ms cubic-bezier(.75,-0.48,.26,1.52)',
            style({ transform: 'translateX(0%)' })),
        ], { optional: true }),
      ]),
      query(':enter', animateChild(), { optional: true }),
    ])
  ])
]);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    routerTransition
  ]
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'angular-lms-course';

  constructor(
    private scormService: ScormService
  ) {}

  ngOnInit() {
    this.scormService.init();
  }

  ngOnDestroy() {
    this.scormService.finish();
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.name;
  }

  routeStart(event) {
    console.log('routeStart', event);
  }

  routeDone(event) {
    console.log('routeDone', event);
  }
}
