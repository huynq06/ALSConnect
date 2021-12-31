import {delay} from 'redux-saga';
import {call, put, takeEvery} from 'redux-saga/effects';
import axios from 'axios';


export function* handleApiRequest(action){
    try{
        const apiConfig = {
            method: 'post',
            url: 'https://jsonplaceholder.typicode.com/posts',
            data: {
              section_id: action.payload.section_id
            }
          };
          const response = yield call(axios, apiConfig);
          yield put({type: 'API_REQUEST_SUCCEEDED', payload: response.data });
    }catch(e){
        yield put({type: 'API_REQUEST_FAILED', payload: e.message });
    }
}
export function* watchApiRequest(){
    yield takeEvery('API_REQUEST',handleApiRequest)
}