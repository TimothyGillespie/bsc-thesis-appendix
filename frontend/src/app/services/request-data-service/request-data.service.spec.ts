import { TestBed } from '@angular/core/testing';

import { RequestDataService } from './request-data.service';

describe('RequestDataService', () => {
  let service: RequestDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
