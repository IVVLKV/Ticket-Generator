import { TestBed, inject } from '@angular/core/testing';

import { AdminInterceptorService } from './admin-interceptor.service';

describe('AdminInterceptorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminInterceptorService]
    });
  });

  it('should be created', inject([AdminInterceptorService], (service: AdminInterceptorService) => {
    expect(service).toBeTruthy();
  }));
});
