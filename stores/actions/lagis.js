import Lagi from "../../models/Lagi";

export const TOGGLE_FAVORITE = 'TOGGLE_FAVORITE'


export const GET_LAGI = 'GET_LAGI'

export const toggleFavorite = (id) => {
    return {
        type: TOGGLE_FAVORITE,
        lagiId : id
    }
}
export const getLagi = (awb) =>{
    return async dispatch =>{
        try {
            const response = await fetch(`http://tracuu.alsc.com.vn/api/ImpAwbApi?awb=${awb}`,
            {
                method: "GET",
                headers: {Accept: "application/json", "Content-Type": "application/json"},
            }
            );
            const resData = await response.json();  
            const loadedLagis = [];
            resData.forEach((item, index) => {
                return loadedLagis.push(
                    new Lagi(
                        item.Lagi_Identity,
                        item.Mawb,
                        item.Hawb,
                        item.Pieces_Received,
                        item.Pieces_Expected,
                        item.Weight,
                        item.Weight_Expected,
                        item.Status_Goods,
                        item.LAGI_TSO,
                        item.Shipper,
                        item.Consignee,
                        item.Remark,
                        item.Lagi_Master_Identity,
                        false
                    )
                );
               
              });
            dispatch({
                type: GET_LAGI,
                lagis: loadedLagis
            });
        }
        catch(err){}
    }
}
