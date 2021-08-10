import { TestBed } from '@angular/core/testing';

import { ApiQueryService } from './api-query.service';

describe('ApiQueryService', () => {
  let service: ApiQueryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiQueryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
