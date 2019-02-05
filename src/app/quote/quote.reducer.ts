import { QuoteState } from './quote.state';
import { QuoteActions, QuoteActionTypes } from './quote.actions';

const initialState: QuoteState = {
  quote: undefined,
  error: undefined,
};

export function reducer(state = initialState, action: QuoteActions): QuoteState {
  switch (action.type) {
    case QuoteActionTypes.NewQuote: {
      return initialState;
    }
    case QuoteActionTypes.NewQuoteSuccess: {
      return { error: undefined, quote: action.payload.quote };
    }
    case QuoteActionTypes.NewQuoteError: {
      return { error: action.payload.error, quote: undefined };
    }
    default:
      return state;
  }
}
