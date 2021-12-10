import {GET_LAGI_DETAIL} from '../actions/lagiDetail'

const initialState = {
    lagiDetail: {},
    currentStep:0,
    currentCustomStep: -1
  };

  export default (state=initialState,action) =>{
    switch(action.type){
        case GET_LAGI_DETAIL:
              return {
                  ...state,
                  lagiDetail: action.lagiDetail,  
                  currentStep: action.currentStep,
                  currentCustomStep: action.currentCustomStep,
              }    
        default:
            return state
    }
    }