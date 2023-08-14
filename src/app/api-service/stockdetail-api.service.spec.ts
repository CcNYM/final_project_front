import { TestBed } from '@angular/core/testing';

import { StockdetailApiService } from './stockdetail-api.service';

describe('StockdetailApiService', () => {
  let service: StockdetailApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StockdetailApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
