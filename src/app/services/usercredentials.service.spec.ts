import { TestBed } from '@angular/core/testing';

import { UsercredentialsService } from './usercredentials.service';

describe('UsercredentialsService', () => {
  let service: UsercredentialsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsercredentialsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
