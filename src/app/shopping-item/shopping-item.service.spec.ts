import { TestBed, inject } from '@angular/core/testing';

import { ShoppingItemService } from './shopping-item.service';

describe('ShoppingItemService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShoppingItemService]
    });
  });

  it('should be created', inject([ShoppingItemService], (service: ShoppingItemService) => {
    expect(service).toBeTruthy();
  }));
});
