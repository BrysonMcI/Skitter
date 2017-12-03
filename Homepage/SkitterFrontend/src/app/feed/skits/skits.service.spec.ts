import { TestBed, inject } from '@angular/core/testing';

import { SkitsService } from './skits.service';

describe('SkitsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SkitsService]
    });
  });

  it('should be created', inject([SkitsService], (service: SkitsService) => {
    expect(service).toBeTruthy();
  }));
});
