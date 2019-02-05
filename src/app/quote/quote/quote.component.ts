import { Component, OnInit } from '@angular/core';
import { QuoteState, Quote } from '../quote.state';
import { Observable } from 'rxjs';
import { tap, filter, distinctUntilChanged } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { getQuote, getError } from '../quote.selector';

@Component({
  selector: 'app-quote',
  template: `
    <blockquote *ngIf="(quote$ | async) as quote">
      <span [innerHtml]="quote.content"></span>
      <footer>{{ quote.title }}</footer>
    </blockquote>
    <pre *ngIf="(error$ | async) as error">
                {{ error | json }}
              </pre
    >
  `,
  styleUrls: ['./quote.component.css'],
})
export class QuoteComponent implements OnInit {
  quote$: Observable<Quote>;
  error$: Observable<unknown>;
  constructor(private readonly store: Store<QuoteState>) {}

  ngOnInit() {
    this.quote$ = this.store.pipe(
      select(getQuote),
      distinctUntilChanged(),
    );
    this.error$ = this.store.pipe(select(getError));
  }
}
