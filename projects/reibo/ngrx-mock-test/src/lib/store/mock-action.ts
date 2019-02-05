import { Action } from '@ngrx/store';
import { TestObservableLike } from 'rxjs-marbles/types';

export const MOCK_ACTION = '[MOCK] ACTION';
export const MOCK_STREAM = '[MOCK] Stream';

export class MockAction implements Action {
  readonly type = MOCK_ACTION;
  readonly payload: unknown;

  constructor(payload?: unknown) {
    this.payload = payload;
  }
}

export class MockStream implements Action {
  readonly type = MOCK_STREAM;
  readonly payload: { stream: TestObservableLike<unknown> };

  constructor(stream: TestObservableLike<unknown>) {
    this.payload = { stream };
  }
}
