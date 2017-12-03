import { TestBed, inject } from '@angular/core/testing';

import { YourProfileService } from './your-profile.service';

describe('YourProfileService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [YourProfileService]
    });
  });

  it('should be created', inject([YourProfileService], (service: YourProfileService) => {
    expect(service).toBeTruthy();
  }));
});
