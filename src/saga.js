// sagas.js
import { takeLatest, put, call, all } from 'redux-saga/effects';
import { fetchDataSuccess, fetchDataFailure } from './actions';
import { FETCH_DATA_REQUEST } from './actionTypes';
import { fetchApiData } from './api';
import { Alert } from 'react-native';

// Worker Saga
// Saga
function* fetchDataSaga(action) {
  try {
    const { userId } = action.payload;
    const data = yield call(fetchApiData, { userId });
    const filteredData = data.filter((d) => d.userId === userId);
    yield put(fetchDataSuccess(filteredData)); // Dispatch success action
  } catch (error) {
    yield put(fetchDataFailure(error)); // Dispatch failure action
    Alert.alert("Error", "Failed to fetch posts");
  }
}

function* watchFetchData() {
  yield takeLatest(FETCH_DATA_REQUEST, fetchDataSaga);
}

export default function* rootSaga() {
  yield all([
    watchFetchData(),
    // Add more watcher sagas here if needed
  ]);
}