import {TestBed} from '@angular/core/testing';

import {SharedMovieListService} from './shared-movie-list.service';

describe('SharedMovieListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SharedMovieListService = TestBed.get(SharedMovieListService);
    expect(service).toBeTruthy();
  });
});
