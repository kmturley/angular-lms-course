import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScormService {
  api: any;
  win = window.opener || window.parent || window;

  constructor() {
    this.api = this.win.API;
    if (!this.api) {
      console.error('API not found...');
    }
  }

  init() {
    const response = this.api.LMSInitialize('');
    return this.response(response);
  }

  finish() {
    const response = this.api.LMSFinish('');
    return this.response(response);
  }

  response(response) {
    if (!response || response === 'false') {
      const errorCode = this.api.LMSGetLastError();
      console.error(`ScormService.response\
        Number: ${errorCode}\
        Description: ${this.api.LMSGetErrorString(errorCode)}\
        Diagnostic: ${this.api.LMSGetDiagnostic(errorCode)}`);
      return false;
    } else {
      console.log('ScormService.response', response);
      return true;
    }
  }
}
