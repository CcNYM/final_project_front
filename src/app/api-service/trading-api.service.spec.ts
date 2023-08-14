import { TestBed } from '@angular/core/testing';

import { TradingApiService } from './trading-api.service';

describe('TradingApiService', () => {
  let service: TradingApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TradingApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
