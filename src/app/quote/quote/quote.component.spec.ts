import { Store } from '@ngrx/store';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { QuoteComponent } from './quote.component';
import { Quote, QuoteState } from '../quote.state';
import { marbles } from 'rxjs-marbles';
import { MockStoreModule, MockAction, MockStream } from '@reibo/ngrx-mock-test';

const quote: Quote = {
  id: 1635,
  title: 'Trent Walton',
  content: 'If I want to get hired to do something, I should already be doing it.',
  link: 'https://quotesondesign.com/trent-walton/',
};
const error = 'this is an error';

describe('QuoteComponent', () => {
  let quoteComponent: QuoteComponent;
  let fixture: ComponentFixture<QuoteComponent>;
  let store: Store<QuoteState>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MockStoreModule.forRoot('quote', {})],
      declarations: [QuoteComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.get(Store);
    fixture = TestBed.createComponent(QuoteComponent);
    quoteComponent = fixture.debugElement.componentInstance;
  });

  describe('on quoteComponent creation', () => {
    it('should create the quoteComponent', () => {
      expect(quoteComponent).toBeTruthy();
    });
  });

  describe('no quote is available in the store', () => {
    beforeEach(() => {
      store.dispatch(new MockAction({}));
      fixture.detectChanges();
    });
    it('should not have an blockquote', () => {
      const blockquoteElement: HTMLElement = fixture.nativeElement.querySelector('blockquote');
      expect(blockquoteElement).toBeNull();
    });
    it('should not have an error div', () => {
      const preElement: HTMLElement = fixture.nativeElement.querySelector('pre');
      expect(preElement).toBeNull();
    });
  });

  describe('a quote is available in the store', () => {
    beforeEach(() => {
      store.dispatch(new MockAction({ quote }));
      fixture.detectChanges();
    });
    it('should have an blockquote', () => {
      const blockquoteElement: HTMLElement = fixture.nativeElement.querySelector('blockquote');
      expect(blockquoteElement).toBeDefined();
      const footerSpan = blockquoteElement.querySelector('footer');
      expect(footerSpan).toBeDefined();
      expect(footerSpan.textContent).toContain(quote.title);
      const quoteSpan = blockquoteElement.querySelector('span');
      expect(quoteSpan).toBeDefined();
      expect(quoteSpan.textContent).toContain(quote.content);
    });
    it('should not have an error div', () => {
      const preElement: HTMLElement = fixture.nativeElement.querySelector('pre');
      expect(preElement).toBeNull();
    });
  });

  describe('an error is available in the store', () => {
    beforeEach(() => {
      store.dispatch(new MockAction({ error }));
      fixture.detectChanges();
    });
    it('should not have an blockquote', () => {
      const blockquoteElement: HTMLElement = fixture.nativeElement.querySelector('blockquote');
      expect(blockquoteElement).toBeNull();
    });
    it('should have an error div', () => {
      const preElement: HTMLElement = fixture.nativeElement.querySelector('pre');
      expect(preElement).toBeDefined();
      expect(preElement.innerHTML).toContain(error);
    });
  });

  describe('the stream should be right', () => {
    it(
      'should return an error/quote stream',
      marbles(m => {
        const stream = {
          a: { quote },
          b: { error },
        };

        const output = {
          u: undefined,
          a: quote,
        };

        const inputStream = m.hot('-a-b-a', stream);
        const outputStream = '*a----';

        quoteComponent.ngOnInit();
        store.dispatch(new MockStream(inputStream));
        m.expect(quoteComponent.quote$).toBeObservable(outputStream, output);
      }),
    );
  });
});
