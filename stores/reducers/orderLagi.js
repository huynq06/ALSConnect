import {ADD_ORDER_LAGI,SET_ORDERS_LAGI} from '../actions/orderLagi';
import OrderLagi from '../../models/OrderLagi';
const initialState = {
  orders: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_ORDER_LAGI:
      const newOrder = new OrderLagi(
        action.orderData.id,
        action.orderData.items,
        action.orderData.orderId,
        action.orderData.created,
      );
      return {
        ...state,
        orders: state.orders.concat(newOrder),
      };
      case SET_ORDERS_LAGI:
        return {
          orders: action.orders
        };
  }
  return state;
};
