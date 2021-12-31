import FlightExp from "../../models/FlightExp";
export const SET_FLIGHT_EXP = 'SET_FLIGHT'
export const fetchFlightsExp = (code,number,date) =>{
    return async dispatch =>{
        try {
            const response = await fetch('http://tracuu.alsc.com.vn/api/FlightExpApi?page=1&pageSize=20&code=' + code + '&flightNo='+number+'&fda='+date+'&tda='+ date,
            {
                method: "GET",
                headers: {Accept: "application/json", "Content-Type": "application/json"},
            }
            );
            const resData = await response.json();  
            const loadedFilterFlights = [];
            resData.Flights.forEach((item, index) => {
                return loadedFilterFlights.push(
                    new FlightExp(
                        item.FlightID,
                        item.Code,
                        item.FlightNo,
                        item.ScheDate,
                        item.ScheTime,
                        item.LandDate,
                        item.LandTime,
                        item.LastAccepted,
                        item.LastAcceptedTime,
                        item.FlightType
                    )
                );
              });
            dispatch({
                type: SET_FLIGHT_EXP,
                flights: loadedFilterFlights
            });
        }
        catch(err){}
    }
}
