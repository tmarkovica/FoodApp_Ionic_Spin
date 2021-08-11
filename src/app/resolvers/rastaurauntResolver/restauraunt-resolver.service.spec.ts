import { TestBed } from '@angular/core/testing';

import { RestaurauntResolverService } from './restauraunt-resolver.service';

describe('RestaurauntResolverService', () => {
  let service: RestaurauntResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestaurauntResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
