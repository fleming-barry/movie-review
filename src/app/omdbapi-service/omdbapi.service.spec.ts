import {TestBed} from '@angular/core/testing';

import {OmDbApiService} from './om-db-api.service';

describe('AmdbapiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OmDbApiService = TestBed.get(OmDbApiService);
    expect(service).toBeTruthy();
  });
});
