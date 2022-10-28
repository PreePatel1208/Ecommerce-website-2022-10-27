import { TestBed } from '@angular/core/testing';

import { JWTDecodeService } from './jwt-decode.service';

describe('JWTDecodeService', () => {
  let service: JWTDecodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JWTDecodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
