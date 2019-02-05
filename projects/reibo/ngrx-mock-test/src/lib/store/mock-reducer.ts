export function createMockReducer<T>(initialState: T) {
  return function reducer(state: any = initialState, action: { payload: any }): T {
    return { ...state, ...action.payload };
  };
}
