import { Store } from '@ngrx/store';

import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { QuoteService } from './quote.service';
import { QuoteActionTypes, NewQuoteSuccess, NewQuoteError } from './quote.actions';
import { Actions, Effect, ofType } from '@ngrx/effects';

@Injectable()
export class QuoteEffects {
  @Effect()
  loadQuote = this.actions$.pipe(
    ofType(QuoteActionTypes.NewQuote),
    switchMap(() => this.quoteService.getNewQuote()),
    tap(console.log),
    map(quote => new NewQuoteSuccess(quote[0])),
    catchError(error => of(new NewQuoteError(error))),
  );

  constructor(private actions$: Actions, private readonly quoteService: QuoteService) {}
}
