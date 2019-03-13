import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// each lazy module must be included at build time to ensure a bundle is created
const routes: Routes = [
  {
    pathMatch: 'full',
    path: 'modules/page',
    loadChildren: './page/page.module#PageModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
