import {GET_LAGI,TOGGLE_FAVORITE} from '../actions/lagis'

const initialState = {
    lagis: [],
    favoriteLagi: []
  };
  export default (state=initialState,action) =>{
    switch(action.type){
        case GET_LAGI:
              return {
                  ...state,
                lagis: action.lagis,  
              }    
        case  TOGGLE_FAVORITE: 
              const existingIndex = state.favoriteLagi.findIndex(c=>c === action.lagiId)
              if(existingIndex >= 0){
                const updateLagi = [...state.favoriteLagi]
                updateLagi.splice(existingIndex,1);
                return{
                  ...state,favoriteLagi: updateLagi
                }
              }
              else{
                 return{
                   ...state,favoriteLagi: state.favoriteLagi.concat(action.lagiId)
                 }
              }
        default:
            return state
    }
}