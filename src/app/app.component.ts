import { Component, OnInit, OnDestroy } from '@angular/core';
import { ScormService } from './shared/scorm.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
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
}
