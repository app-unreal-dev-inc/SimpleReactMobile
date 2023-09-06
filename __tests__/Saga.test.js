// sagas.test.js
import { call, put } from 'redux-saga/effects';
import { fetchDataSaga } from '../src/saga';
import { fetchDataSuccess, fetchDataFailure } from '../src/actions';
import { fetchApiData } from '../src/api';
import { applyMiddleware, createStore } from 'redux';

describe("fetchDataSaga", () => {
  const action = {
    payload: {
      userId: 1,
    },
  };

  it("should dispatch fetchDataSuccess action on successful API call", () => {
    const generator = fetchDataSaga(action);
    const data = [{ id: 1, userId: 1, title: "Post 1", body: "Lorem ipsum" }];

    expect(generator.next().value).toEqual(call(fetchApiData, { userId: 1 }));
    expect(generator.next(data).value).toEqual(
      put(fetchDataSuccess([{ id: 1, userId: 1, title: "Post 1", body: "Lorem ipsum" }]))
    );
    expect(generator.next().done).toBeTruthy();
  });

  it("should dispatch fetchDataFailure action on failed API call", () => {
    const generator = fetchDataSaga(action);
    const error = new Error("API error");

    expect(generator.next().value).toEqual(call(fetchApiData, { userId: 1 }));
    expect(generator.throw(error).value).toEqual(
      put(fetchDataFailure(new Error("API error")))
    );
    expect(generator.next().done).toBeTruthy();
  });
});

describe("store", () => {
  // Mock the reducer and saga middleware
  const reducer = jest.fn();
  const sagaMiddleware = jest.fn();

  // Create the store
  const store = createStore(reducer, applyMiddleware(sagaMiddleware));

  it("should have the correct initial state", () => {
    expect(store.getState()).toEqual({
      loading: true,
      posts: [],
      refreshing: false,
      error: null,
    });
  });

  it("should dispatch actions correctly", () => {
    render(<App />)
    const action = { type: "FETCH_DATA_REQUEST" };

    store.dispatch(action);
    expect(store.getState()).toEqual({
      loading: true,
      posts: [],
      refreshing: true,
      error: null,
    });

    const successAction = { type: "FETCH_DATA_SUCCESS", payload: [{ id: 1, userId: 1, title: "Post 1", body: "Lorem ipsum" }] };

    store.dispatch(successAction);
    expect(store.getState()).toEqual({
      loading: false,
      posts: [{ id: 1, userId: 1, title: "Post 1", body: "Lorem ipsum" }],
      refreshing: false,
      error: null,
    });

    const failureAction = { type: "FETCH_DATA_FAILURE", payload: new Error("API error") };

    store.dispatch(failureAction);
    expect(store.getState()).toEqual({
      loading: false,
      posts: [],
      refreshing: false,
      error: new Error("API error"),
    });
  });
});