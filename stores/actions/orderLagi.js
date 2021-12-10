export const ADD_ORDER_LAGI = 'ADD_ORDER_LAGI';
export const SET_ORDERS_LAGI = 'SET_ORDERS_LAGI';
import OrderLagi from "../../models/OrderLagi";

export const fetchOrders = () =>{
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    try {
      const response = await fetch(
        `http://tracuu.alsc.com.vn/api/OrderLagiApi/${userId}`
      );

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const resData = await response.json();
      const loadedOrders = [];
      resData.forEach((item,index)=>{
        loadedOrders.push(
          new OrderLagi(
            item?.ID,
            item?.OrderLagiDetails,
            item?.OrderId,
            item?.Created
          )
        )
      })
      dispatch({ type: SET_ORDERS_LAGI, orders: loadedOrders });
    } catch (err) {
      throw err;
    }
  };
}

export const addOrder = (cartItems,tokenNotification) => {
    return async (dispatch, getState) => {
      const token = getState().auth.token;
      const userId = getState().auth.userId;
      const date = new Date();
      const data = JSON.stringify({
        OrderLagiDetails :cartItems,
        UserID: userId
      })
      const response = await fetch(
        `http://tracuu.alsc.com.vn/api/OrderLagiApi/Add`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            OrderLagiDetails :cartItems,
            UserID: userId,
            TokenID: tokenNotification
          })
        }
      );
  
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
  
      const resData = await response.json();
      dispatch({
        type: ADD_ORDER_LAGI,
        orderData: {
          id: resData.ID,
          items: resData.OrderLagiDetails,
          orderId: resData.OrderId,
          created: resData.Created
        }
      });
/*   
      dispatch({
        type: ADD_ORDER_LAGI,
        orderData: {
          id: resData.name,
          items: cartItems,
          amount: totalAmount,
          date: date
        }
      });
   */
     /*  for (const cartItem of cartItems) {
        const pushToken = cartItem.productPushToken;
  
        fetch('https://exp.host/--/api/v2/push/send', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Accept-Encoding': 'gzip, deflate',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            to: pushToken,
            title: 'Order was placed!',
            body: cartItem.productTitle
          })
        });
      } */
    };
  };