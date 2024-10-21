import { TestBed } from '@angular/core/testing';

import { TaskrServiceService } from './taskr-service.service';

describe('TaskrServiceService', () => {
  let service: TaskrServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskrServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
