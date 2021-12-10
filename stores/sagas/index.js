import {fork,all} from 'redux-saga/effects';

import {watchIncrementAsync} from './counter';
import {watchApiRequest} from './apiTester';

export default function* rootSaga() {
    console.log('da chay vao rootSaga')
  yield all([
    fork(watchIncrementAsync),
    fork(watchApiRequest)
  ])
}
