import { ADD_TO_CART_LAGI, REMOVE_FROM_CART_LAGI } from "../actions/cartLagi";
import CartLagiItem from "../../models/CartLagiItem";
import {ADD_ORDER_LAGI} from '../actions/orderLagi'
const initialState = {
    items: {},
    quantity: 0,
  };
  
  export  default (state= initialState,action)=>{
      switch(action.type){
          case ADD_TO_CART_LAGI:
              const addedLagi = action.lagi
              let newCartLagiItem;
              if(state.items[addedLagi.id]){

              }
              else{
                  newCartLagiItem = new CartLagiItem(
                      1,
                      addedLagi.mawb,
                      addedLagi.hawb,
                      addedLagi.id
                  )
              }
            return{
                ...state,
                items:{...state.items,[addedLagi.id]:newCartLagiItem},
                quantity: state.quantity + 1
            } ;
          case REMOVE_FROM_CART_LAGI:   
          const selectedCartItem = state.items[action.lid];
          const currentQty = state.quantity;
          let updatedCartItem;
          updatedCartItem = { ...state.items };
          delete updatedCartItem[action.lid];
          return{
              ...state,
              items: updatedCartItem,
              quantity: state.quantity - 1
          }
          case ADD_ORDER_LAGI:
              return initialState;
      }
      return state;
  }