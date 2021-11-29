import { TestBed } from '@angular/core/testing';

import { ServersettingsService } from './serversettings.service';

describe('ServersettingsService', () => {
  let service: ServersettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServersettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
