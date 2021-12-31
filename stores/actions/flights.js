import Flight from "../../models/Flight";
export const SET_FLIGHT = 'SET_FLIGHT'
export const TOGGLE_FAVOURITE_FLIGHT = 'TOGGLE_FAVOURITE_FLIGHT'
export const SET_FAVOURITE_FLIGHT = 'SET_FAVOURITE_FLIGHT'
import moment from "moment";
export const fetchFlights = (code,number,date) =>{
    return async dispatch =>{
        try {
            const response = await fetch('http://tracuu.alsc.com.vn/api/FlightImpApi?page=1&pageSize=20&code=' + code + '&flightNo='+number+'&fda='+date+'&tda='+ date,
            {
                method: "GET",
                headers: {Accept: "application/json", "Content-Type": "application/json"},
            }
            );
            const resData = await response.json();  
            const loadedFilterFlights = [];
            resData.Flights.forEach((item, index) => {
                return loadedFilterFlights.push(
                    new Flight(
                        item.FlightID,
                        item.Code,
                        item.FlightNo,
                        item.ScheDate,
                        item.ScheTime,
                        item.LandDate,
                        item.LandTime,
                        item.FlightType
                    )
                );
              });
            dispatch({
                type: SET_FLIGHT,
                flights: loadedFilterFlights
            });
        }
        catch(err){}
    }
}
export const fetchFavouriteFlights = (type) =>{
    return async (dispatch, getState) => {
        const userId = getState().auth.userId;
        try {
          const response = await fetch(
            'http://tracuu.alsc.com.vn/api/FlightFavouriteApi?userId='+userId + '&type='+type
          );
    
          if (!response.ok) {
            throw new Error('Something went wrong!');
          }
    
          const resData = await response.json();
          const loadedFavouriteFlights = [];
          resData.forEach((item,index)=>{
            loadedFavouriteFlights.push(
                item.FlightID
            )
          })
          dispatch({ type: SET_FAVOURITE_FLIGHT, favouriteFlights: loadedFavouriteFlights });
        } catch (err) {
          throw err;
        }
      };
}
export const addFavouriteFlights = (id,tokenNotification,type) =>{
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        const userId = getState().auth.userId;
        const data = JSON.stringify({
            FlightID :id,
            UserID: userId,
            TokenID: tokenNotification
          })
        const response = await fetch(
          `http://tracuu.alsc.com.vn/api/FlightFavouriteApi/Add`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body:  JSON.stringify({
              FlightID :id,
              UserID: userId,
              TokenID: tokenNotification,
              Type: type
            })
          }
        );
    
        if (!response.ok) {
          throw new Error('Something went wrong!');
        }
    
        const resData = await response.json();
        dispatch({
          type: TOGGLE_FAVOURITE_FLIGHT,
          fid: id
        });
}
}