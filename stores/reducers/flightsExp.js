
import {SET_FAVOURITE_FLIGHT_EXP,SET_FLIGHT_EXP,TOGGLE_FAVOURITE_FLIGHT_EXP} from '../actions/flightsExp'
const initialState = {
    Flights: [],
    favourtiteFlights : []
  };
  

  export default (state=initialState,action) =>{
      switch(action.type){
              case SET_FLIGHT_EXP:
                return {
                  ...state,
                   flights: action.flights
                }
              case SET_FAVOURITE_FLIGHT:
                return{
                  ...state,
                  favourtiteFlights: action.favouriteFlights
                }  
              case   TOGGLE_FAVOURITE_FLIGHT :
                const existingIndex = state.favourtiteFlights.findIndex(id=>id ===action.fid)
                if(existingIndex>=0){
                    const updateFavourite = [...state.favourtiteFlights];
                    updateFavourite.splice(existingIndex,1);
                    return {...state,favourtiteFlights:updateFavourite}
                }
                else {
                    return {...state,favourtiteFlights: state.favourtiteFlights.concat(action.fid)}
                }

      }
      return state;
  }