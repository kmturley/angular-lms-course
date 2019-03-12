import { TestBed } from '@angular/core/testing';

import { ScormService } from './scorm.service';

describe('ScormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ScormService = TestBed.get(ScormService);
    expect(service).toBeTruthy();
  });
});
