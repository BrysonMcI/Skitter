import { TestBed, inject } from '@angular/core/testing';

import { InitiateService } from './initiate.service';

describe('InitiateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InitiateService]
    });
  });

  it('should be created', inject([InitiateService], (service: InitiateService) => {
    expect(service).toBeTruthy();
  }));
});
