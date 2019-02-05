import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { QuoteEffects } from './quote/quote.effects';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { QuoteComponent } from './quote/quote/quote.component';
import { reducer as quoteReducer } from './quote/quote.reducer';
import { reducers, metaReducers } from './reducers';
import { AppEffects } from './app.effects';
import { environment } from '../environments/environment';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreModule.forFeature('quote', quoteReducer),
    EffectsModule.forRoot([AppEffects, QuoteEffects, AppEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 50,
      name: 'Debug DevTools',
      logOnly: true,
    }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
  ],
  declarations: [AppComponent, QuoteComponent],
  bootstrap: [AppComponent],
  providers: [],
})
export class AppModule {}
