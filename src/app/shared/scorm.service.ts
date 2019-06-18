import { Injectable } from '@angular/core';

// SCORM 1.2 documentation
// https://scorm.com/scorm-explained/technical-scorm/run-time/run-time-reference/#section-2

@Injectable({
  providedIn: 'root'
})
export class ScormService {
  api: any;
  win = window.opener || window.top || window.parent || window;
  values = [
    'cmi.core._children',
    'cmi.core.student_id',
    'cmi.core.student_name',
    'cmi.core.lesson_location',
    'cmi.core.credit',
    'cmi.core.lesson_status',
    'cmi.core.entry',
    'cmi.core.score_children',
    'cmi.core.score.raw',
    'cmi.core.score.max',
    'cmi.core.score.min',
    'cmi.core.total_time',
    'cmi.core.lesson_mode',
    'cmi.core.exit',
    'cmi.core.session_time',
    'cmi.suspend_data',
    'cmi.launch_data',
    'cmi.comments',
    'cmi.comments_from_lms',
    'cmi.objectives._children',
    'cmi.objectives._count',
    'cmi.objectives.n.id',
    'cmi.objectives.n.score._children',
    'cmi.objectives.n.score.raw',
    'cmi.objectives.n.score.max',
    'cmi.objectives.n.score.min',
    'cmi.objectives.n.status',
    'cmi.student_data._children',
    'cmi.student_data.mastery_score',
    'cmi.student_data.max_time_allowed',
    'cmi.student_data.time_limit_action',
    'cmi.student_preference._children',
    'cmi.student_preference.audio',
    'cmi.student_preference.language',
    'cmi.student_preference.speed',
    'cmi.student_preference.text',
    'cmi.interactions._children',
    'cmi.interactions._count',
    'cmi.interactions.n.id',
    'cmi.interactions.n.objectives._count',
    'cmi.interactions.n.objectives.n.id',
    'cmi.interactions.n.time',
    'cmi.interactions.n.type',
    'cmi.interactions.n.correct_responses._count',
    'cmi.interactions.n.weighting',
    'cmi.interactions.n.student_response',
    'cmi.interactions.n.result',
    'cmi.interactions.n.latency'
  ];

  constructor() {
    this.api = this.win.API;
    if (!this.api) {
      console.error('API not found...');
    }
  }

  debug() {
    console.log('ScormService.debug');
    this.values.forEach((val) => {
      console.log(val, this.get(val));
    });
  }

  init() {
    if (this.api) {
      return this.api.LMSInitialize('');
    }
  }

  finish() {
    if (this.api) {
      return this.api.LMSFinish('');
    }
  }

  get(name: string) {
    if (this.api) {
      return this.api.LMSGetValue(name);
    }
  }

  set(name: string, val: string) {
    if (this.api) {
      return this.api.LMSSetValue(name, val);
    }
  }

  commit() {
    if (this.api) {
      return this.api.LMSCommit('');
    }
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

  getScore(): number {
    return Number(this.get('cmi.core.score.raw')) || 0;
  }

  setScore(val: number) {
    return this.set('cmi.core.score.raw', String(val));
  }

  getTotalTime(): string {
    return this.get('cmi.core.total_time') || 0;
  }

  setTotalTime(val: string) {
    return this.set('cmi.core.total_time', String(val));
  }

  getSessionTime(): string {
    return this.get('cmi.core.session_time') || 0;
  }

  setSessionTime(val: string) {
    return this.set('cmi.core.session_time', String(val));
  }

  getStatus(): string {
    return this.get('cmi.core.lesson_status');
  }

  setStatus(val: string) {
    return this.set('cmi.core.lesson_status', val);
  }

  getSuspendData(): object {
    return JSON.parse(this.get('cmi.suspend_data') || '{}');
  }

  setSuspendData(val: object) {
    return this.set('cmi.suspend_data', JSON.stringify(val));
  }

}
