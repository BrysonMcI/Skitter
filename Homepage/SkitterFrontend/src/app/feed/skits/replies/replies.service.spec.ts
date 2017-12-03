import { TestBed, inject } from '@angular/core/testing';

import { RepliesService } from './replies.service';

describe('RepliesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RepliesService]
    });
  });

  it('should be created', inject([RepliesService], (service: RepliesService) => {
    expect(service).toBeTruthy();
  }));
});
