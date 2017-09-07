import { TestBed, inject } from '@angular/core/testing';

import { ListedItemService } from './listed-item.service';

describe('ListedItemService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ListedItemService]
    });
  });

  it('should be created', inject([ListedItemService], (service: ListedItemService) => {
    expect(service).toBeTruthy();
  }));
});
