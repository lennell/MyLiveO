import { TestBed } from '@angular/core/testing';

import { LiveHttpServiceService } from './live-http-service.service';

describe('LiveHttpServiceService', () => {
  let service: LiveHttpServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LiveHttpServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
