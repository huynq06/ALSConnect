import {GET_LAB,TOGGLE_FAVOURITE_LAB} from '../actions/labs'

const initialState = {
    labs: {},
    labIdent:null,
    isFavourite:false
  };
  export default (state=initialState,action) =>{
    switch(action.type){
        case GET_LAB:
              return {
                  ...state,
                  labs: action.loadedAwb,  
                  labIdent: action.labId,
                  isFavourite: action.isFavourite
              }    
        default:
            return state
    }
}