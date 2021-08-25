import { TestBed } from '@angular/core/testing';

import { MealImageService } from './meal-image.service';

describe('MealImageService', () => {
  let service: MealImageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MealImageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
