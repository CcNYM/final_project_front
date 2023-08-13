import { TestBed } from '@angular/core/testing';

import { SellServiceService } from './sell-service.service';

describe('SellServiceService', () => {
  let service: SellServiceService;



  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SellServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
