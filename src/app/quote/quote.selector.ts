import { Quote, QuoteState } from './quote.state';

import { createFeatureSelector, createSelector } from '@ngrx/store';

export const getQuoteState = createFeatureSelector<QuoteState>('quote');

export const getQuote = createSelector(
  getQuoteState,
  (state: QuoteState) => state.quote,
);

export const getError = createSelector(
  getQuoteState,
  (state: QuoteState) => state.error,
);
