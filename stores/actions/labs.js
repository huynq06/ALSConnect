import ResultExp from "../../models/Lab";
import ExportAwbTrackStatus from "../../models/ExportAwbTrackStatus";
import ExportAwbCustomTrackStatus from "../../models/ExportAwbCustomTrackStatus";
export const GET_LAB = 'GET_LAB'
export const TOGGLE_FAVOURITE_LAB = 'ADD_FAVOURITE_LAB'
export const EXPORT_AWB_TRACK_STATUS = 'EXPORT_AWB_TRACK_STATUS'
export const EXPORT_AWB_CUSTOM_TRACK_STATUS = 'EXPORT_AWB_CUSTOM_TRACK_STATUS'
export const EXPORT_AWB_CUSTOM_CLEAR_TRACK = 'EXPORT_AWB_CUSTOM_CLEAR_TRACK'
export const getLab = (awb) =>{
    return async dispatch =>{
        try {
            const response = await fetch(`http://tracuu.alsc.com.vn/api/SearchExportAwbApi?awb=${awb}`,
            {
                method: "GET",
                headers: {Accept: "application/json", "Content-Type": "application/json"},
            }
            );
            const resData = await response.json(); 
            let loadedAwb;
            loadedAwb = new ResultExp(
                resData.CargoStatus,
                resData.FlightExps,
                resData.GenralExp,
                resData.IsFavourite
            )
            dispatch({
                type: GET_LAB,
                loadedAwb: loadedAwb,
                labId: loadedAwb.genralExp.Lab_Ident,
                IsFavourite: loadedAwb.isFavourite
            });
        }
        catch(err){}
    }
}
export const clearTrackCusTomStatus = () =>{
  return {type:EXPORT_AWB_CUSTOM_CLEAR_TRACK}
}
export const trackStatus = (labIdent) =>{
  return async dispatch =>{
    try {
        const response = await fetch(`http://tracuu.alsc.com.vn/api/ExportAwbTrackStatusApi?lab_Ident=${labIdent}`,
        {
            method: "GET",
            headers: {Accept: "application/json", "Content-Type": "application/json"},
        }
        );
        if (!response.ok) {
          throw new Error('Something went wrong!');
        }
        const resData = await response.json(); 
        let loadedTrackStatus;
        loadedTrackStatus = new ExportAwbTrackStatus(
            resData.TrackStatus,
            resData.Status,
        )
        dispatch({
            type: EXPORT_AWB_TRACK_STATUS,
            loadedTrackStatus: loadedTrackStatus.trackStatus,
            status: loadedTrackStatus.status
        });
    }
    catch(err){}
}
}
export const trackCustomStatus = (labIdent) =>{
  return async dispatch =>{
    try {
        const response = await fetch(`http://tracuu.alsc.com.vn/api/ExportAwbTrackCustomStatusApi?labIdent=${labIdent}`,
        {
            method: "GET",
            headers: {Accept: "application/json", "Content-Type": "application/json"},
        }
        );
        if (!response.ok) {
          throw new Error('Something went wrong!');
        }
        const resData = await response.json(); 
        const loadedTrackCustom = [];
        if(resData.length > 0){
          resData.forEach((item, index) => {
            return loadedTrackCustom.push(
                new ExportAwbCustomTrackStatus(
                    item.SDD,
                    item.STK,
                    item.GetInStatus,
                    item.GetInPieces,
                    item.GetInMessage,
                    item.GetInDate,
                    item.GetOutStatus,
                    item.GetOutPieces,
                    item.GetOutMessage,
                    item.GetOutDate,
                )
            );
           
          });
        }
            
            dispatch({
                type: EXPORT_AWB_CUSTOM_TRACK_STATUS,
                loadedTrackCustom: loadedTrackCustom
            });
    }
    catch(err){}
}
}
export const addFavouriteLab = (id,tokenNotification) =>{
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        const userId = getState().auth.userId;
        const response = await fetch(
          `http://tracuu.alsc.com.vn/api/LabFavouriteApi/Add`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body:  JSON.stringify({
              Lab_Idents :id,
              UserID: userId,
              TokenID: tokenNotification
            })
          }
        );
    
        if (!response.ok) {
          throw new Error('Something went wrong!');
        }
}
}


   