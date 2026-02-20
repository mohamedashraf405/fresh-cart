import { TestBed } from '@angular/core/testing';

import { CheckplateformService } from './checkplateform.service';

describe('CheckplateformService', () => {
  let service: CheckplateformService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckplateformService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
