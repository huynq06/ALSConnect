import {call, put, takeEvery,takeLatest,delay} from 'redux-saga/effects';

export function* handleIncrementAsync() {
  yield delay(1000);
  yield put({type: 'INCREMENT'});
}

export function* watchIncrementAsync() {
  yield takeLatest('INCREMENT_ASYNC', handleIncrementAsync);
}
