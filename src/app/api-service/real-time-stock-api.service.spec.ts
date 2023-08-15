import { TestBed } from '@angular/core/testing';

import { RealTimeStockApiService } from './real-time-stock-api.service';

describe('RealTimeStockApiService', () => {
  let service: RealTimeStockApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RealTimeStockApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
