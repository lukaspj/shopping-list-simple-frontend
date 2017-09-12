import { TestBed, inject } from '@angular/core/testing';

import { IngredientSearchService } from './ingredient-search.service';

describe('IngredientSearchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IngredientSearchService]
    });
  });

  it('should be created', inject([IngredientSearchService], (service: IngredientSearchService) => {
    expect(service).toBeTruthy();
  }));
});
