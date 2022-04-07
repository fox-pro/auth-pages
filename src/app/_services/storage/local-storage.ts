import { Injectable } from '@angular/core';

import { StubStorage } from './stub-storage';
import { StorageService } from './storage.service';
import { Logger } from '../logger/logger';

@Injectable({providedIn: 'root'})
export class LocalStorageService extends StorageService {
  constructor(
    logger: Logger,
  ) {
    try {
      // Test storage accessibility - Needed for private browsing
      window.localStorage.setItem('storage_test', '1');
      window.localStorage.removeItem('storage_test');
      super(window.localStorage);
      return;
    } catch (e) {
      logger.warn('Local storage is not supported', e);
    }
    super(new StubStorage());
  }
}
