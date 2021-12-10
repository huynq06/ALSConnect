import * as types from './actionTypes';

export function start(payload){
    console.log('da chay vao start loading ',payload)
    return{
        type: types.START_LOADING,
        payload: payload
    }
}

export function stop(payload) {
    return {
      type: types.STOP_LOADING,
      payload: payload
    }
  }
  
  export function clear() {
    return {
      type: types.CLEAR_LOADING,
    }
  }
  