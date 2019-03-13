import { ActivatedRoute } from '@angular/router';
import { Component, ElementRef, HostBinding, OnInit, ViewChild } from '@angular/core';
import { trigger, stagger, animate, style, query, transition } from '@angular/animations';
import { lottie } from 'lottie-web/build/player/lottie';

import { ApiService } from '../shared/api.service';

export class PageData {
  name: string;
  description: string;
  bgAnimation: string;
  bgImage: string;
  pathNext: string;
  pathPrev: string;
}

export class Page {
  data: PageData;
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
  @ViewChild('content', {read: ElementRef}) content: ElementRef;
  @HostBinding('@pageTransition') transition = '';
  public page: PageData;
  public lottieConfig: object;
  private anim: any;
  private animationSpeed = 1;

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.data.subscribe((routeData: PageData) => {
      console.log('routeData', routeData);
      this.page = routeData;
      if (this.page.bgAnimation) {
        this.lottieConfig = {
          path: this.page.bgAnimation,
          renderer: 'canvas',
          autoplay: true,
          loop: true
        };
      }
    });
  }

  handleAnimation(anim: any) {
    this.anim = anim;
  }

  stop() {
    this.anim.stop();
  }

  play() {
    this.anim.play();
  }

  pause() {
    this.anim.pause();
  }

  setSpeed(speed: number) {
    this.animationSpeed = speed;
    this.anim.setSpeed(speed);
  }

}
