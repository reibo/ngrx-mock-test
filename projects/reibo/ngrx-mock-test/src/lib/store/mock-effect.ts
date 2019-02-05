import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { MOCK_STREAM, MockAction, MockStream } from './mock-action';

@Injectable()
export class MockEffect {
  @Effect({ dispatch: false })
  loadStream$ = this.actions$.pipe(
    ofType<MockStream>(MOCK_STREAM),
    switchMap(action => action.payload.stream),
    tap(action => this.store.dispatch(new MockAction(action))),
  );

  constructor(private actions$: Actions, private store: Store<unknown>) {}
}
