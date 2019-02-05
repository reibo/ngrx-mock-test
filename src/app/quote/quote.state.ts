export interface Quote {
  id: number;
  title: string;
  content: string;
  link: string;
}

export interface QuoteState {
  quote: Quote;
  error: unknown;
}
