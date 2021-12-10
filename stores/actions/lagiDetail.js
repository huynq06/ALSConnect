import LagiDetail from "../../models/LagiDetail";
export const GET_LAGI_DETAIL = 'GET_LAGI_DETAIL'
export const getLagi = (lagi_Id) =>{
    return async dispatch =>{
        try {
            const response = await fetch(`http://tracuu.alsc.com.vn/api/ImpAwbDetailApi?lagi_id=${lagi_Id}`,
            {
                method: "GET",
                headers: {Accept: "application/json", "Content-Type": "application/json"},
            }
            );
            const resData = await response.json();  
            let loadedLagiDetail;
            console.log('resData.Status',resData.Status)
            loadedLagiDetail = new LagiDetail(
                resData.Lagi_Identity,
                resData.Mawb,
                resData.Hawb,
                resData.Pieces_Received,
                resData.Pieces_Expected,
                resData.Weight,
                resData.Weight_Expected,
                resData.Status_Goods,
                resData.LAGI_TSO,
                resData.Shipper,
                resData.Consignee,
                resData.Remark,
                resData.Lagi_Master_Identity,
                resData.Status,
                resData.Status_Goods
            )
            dispatch({
                type: GET_LAGI_DETAIL,
                lagiDetail: loadedLagiDetail,
                currentStep: resData.Status,
                currentCustomStep:  resData.Status_Goods,
            });
        }
        catch(err){}
    }
}