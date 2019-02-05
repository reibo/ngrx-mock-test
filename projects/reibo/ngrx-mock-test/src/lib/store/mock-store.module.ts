import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { ActionReducerMap, MetaReducer, ReducerManager, StoreModule } from '@ngrx/store';
import { createMockReducer } from './mock-reducer';
import { EffectsModule } from '@ngrx/effects';
import { MockEffect } from './mock-effect';

const reducers: ActionReducerMap<unknown> = {};

const metaReducers: MetaReducer<unknown>[] = [];

export function initReducer(featureName: string, initialState: unknown) {
  return function(reducer: ReducerManager) {
    return function() {
      return new Promise(function(resolve, reject) {
        reducer.addReducer(featureName, createMockReducer(initialState));
        resolve('mocked reducer');
      });
    };
  };
}

// @dynamic
@NgModule({
  imports: [StoreModule.forRoot(reducers, { metaReducers }), EffectsModule.forRoot([MockEffect])],
  exports: [StoreModule],
})
export class MockStoreModule {
  static forRoot(featureName: string, initialState: unknown): ModuleWithProviders {
    return {
      ngModule: MockStoreModule,
      providers: [
        { provide: 'FEATURE_NAME', useValue: featureName, multi: true },
        {
          provide: APP_INITIALIZER,
          useFactory: initReducer(featureName, initialState),
          deps: [ReducerManager],
          multi: true,
        },
      ],
    };
  }
}
