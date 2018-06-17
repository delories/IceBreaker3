import { TestBed, inject } from '@angular/core/testing';

import { NewdataService } from './newdata.service';

describe('NewdataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NewdataService]
    });
  });

  it('should be created', inject([NewdataService], (service: NewdataService) => {
    expect(service).toBeTruthy();
  }));
});
