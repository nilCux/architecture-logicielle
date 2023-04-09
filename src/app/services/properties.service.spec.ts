import { TestBed } from '@angular/core/testing';

import { Properties } from './properties.service';

describe('PropertiesService', () => {
  let service: Properties;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Properties);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
