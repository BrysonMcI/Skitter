import { TestBed, inject } from '@angular/core/testing';

import { NewSkitService } from './new-skit.service';

describe('NewSkitService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NewSkitService]
    });
  });

  it('should be created', inject([NewSkitService], (service: NewSkitService) => {
    expect(service).toBeTruthy();
  }));
});
