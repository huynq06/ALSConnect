import {fork,all} from 'redux-saga/effects';

import {watchIncrementAsync} from './counter';
import {watchApiRequest} from './apiTester';

export default function* rootSaga() {
  yield all([
    fork(watchIncrementAsync),
    fork(watchApiRequest)
  ])
}
