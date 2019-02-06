# @reibo/ngrx-mock-test

[![npm](https://img.shields.io/npm/v/%40reibo%2Fngrx-mock-test.svg?style=flat-square)](https://www.npmjs.com/package/%40reibo%2Fngrx-mock-test)
![GitHub](https://img.shields.io/github/license/mashape/apistatus.svg)
[![npm](https://img.shields.io/npm/dt/%40reibo%2Fngrx-mock-test.svg?style=flat-square)](https://www.npmjs.com/package/%40reibo%2Fngrx-mock-test)

[![CircleCI](https://img.shields.io/circleci/project/github/reibo/ngrx-mock-test.svg)](https://circleci.com/gh/reibo/-reibo-ngrx-mock-test)

[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

<a href="https://twitter.com/reibo_bo"><img src="https://img.shields.io/twitter/follow/reibo_bo.svg?style=social"></a>

## A library that implements the features described on

[Blog on medium](https://medium.com/@bo.vandersteene/mock-your-ngrx-store-on-the-easy-way-68c66d4bea63)

## Use this library

full example on [stackblitz](https://test-ngrx-store-with-npm-dep.stackblitz.io) or in the [src](src) folder

### Install the npm dependency

`npm i @reibo/ngrx-mock-test -d`, or if you preffer yarn `yarn add @reibo/ngrx-mock-test -d`

### Initialize the Mock store in your project

The purpose of this mock store is to use it on feature based stores.

You will provide the data in the store like you decide, so it is ideal to test with mocked data.

In the MockStoreModule in your Testbed imports with your feature name and an initial state.

```
beforeEach(async(() => {
 TestBed.configureTestingModule({
   imports: [ MockStoreModule.forRoot('feature_name', initialState)],
   ...
 }).compileComponents();
}));
```

Next get store out of the testbed

```
store = TestBed.get(Store);
```

Change the state in your test during testing with the mock

```
store.dispatch(new MockAction({ name: "foo" }));
```

Do you like to work with streams and you us marble testing?

Try out:

```
const inputStream = m.hot('-a-b-a', stream);
store.dispatch(new MockStream(inputStream));
```
