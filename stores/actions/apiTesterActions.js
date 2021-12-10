import * as types from './actionTypes';

export function apiRequest(payload){
    console.log('payload',payload)
    return{
        type: types.API_REQUEST,
        payload: payload
    }
}

export function apiRequestSucceeded(payload) {
    return {
      type: types.API_REQUEST_SUCCEEDED,
      payload: payload
    }
  }
  
  export function apiRequestFailed(payload) {
    return {
      type: types.API_REQUEST_FAILED,
      payload: payload
    }
  }
  