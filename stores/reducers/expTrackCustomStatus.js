import {EXPORT_AWB_CUSTOM_TRACK_STATUS,EXPORT_AWB_CUSTOM_CLEAR_TRACK} from '../actions/labs'

const initialState = {
    trackCustomStatus: [],
  };
  export default (state=initialState,action) =>{
    switch(action.type){
        case EXPORT_AWB_CUSTOM_TRACK_STATUS:
              return {
                  ...state,
                  trackCustomStatus: action.loadedTrackCustom,  
              }    
        case EXPORT_AWB_CUSTOM_CLEAR_TRACK:
            return{
                ...initialState
            }      
        default:
            return state
    }
}