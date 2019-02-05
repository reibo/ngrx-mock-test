import { Action } from '@ngrx/store';
import { Quote } from './quote.state';

export enum QuoteActionTypes {
  NewQuote = '[Quote] get new quote',
  NewQuoteSuccess = '[Quote] new quote received',
  NewQuoteError = '[Quote] new quote Error',
}

export class NewQuote implements Action {
  readonly type = QuoteActionTypes.NewQuote;
}

export class NewQuoteSuccess implements Action {
  readonly type = QuoteActionTypes.NewQuoteSuccess;
  readonly payload: { quote: Quote };

  constructor(quote: Quote) {
    this.payload = { quote };
  }
}
export class NewQuoteError implements Action {
  readonly type = QuoteActionTypes.NewQuoteError;
  readonly payload: { error: unknown };

  constructor(error: unknown) {
    this.payload = { error };
  }
}

export type QuoteActions = NewQuote | NewQuoteSuccess | NewQuoteError;
