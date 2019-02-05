import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { NewQuote } from './quote/quote.actions';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  name = 'Angular';

  constructor(private readonly store: Store<unknown>) {
    this.newQuote();
  }

  newQuote() {
    this.store.dispatch(new NewQuote());
  }
}
