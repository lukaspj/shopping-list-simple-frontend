import { TestBed, inject } from '@angular/core/testing';

import { IngredientUnitService } from './ingredient-unit.service';

describe('IngredientUnitService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IngredientUnitService]
    });
  });

  it('should be created', inject([IngredientUnitService], (service: IngredientUnitService) => {
    expect(service).toBeTruthy();
  }));
});
