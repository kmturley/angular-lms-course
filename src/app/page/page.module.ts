import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LottieAnimationViewModule } from 'ng-lottie';
import { RouterModule } from '@angular/router';
import { PageComponent } from './page.component';

@NgModule({
  imports: [
    CommonModule,
    LottieAnimationViewModule.forRoot(),
    RouterModule.forChild([
      { path: '', component: PageComponent, pathMatch: 'full'}
    ])
  ],
  declarations: [PageComponent]
})
export class PageModule { }
