import {EXPORT_AWB_TRACK_STATUS} from '../actions/labs'

const initialState = {
    trackStatus: [],
    status:null,
  };
  export default (state=initialState,action) =>{
    switch(action.type){
        case EXPORT_AWB_TRACK_STATUS:
              return {
                  ...state,
                  trackStatus: action.loadedTrackStatus,  
                  status: action.status,
              }    
        default:
            return state
    }
}