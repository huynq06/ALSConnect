export const ADD_TO_CART_LAGI = 'ADD_TO_CART_LAGI'
export const REMOVE_FROM_CART_LAGI = "REMOVE_FROM_CART_LAGI"

export const addToCartLagi = lagi =>{
    return {type:ADD_TO_CART_LAGI,lagi: lagi}
}

export const removeFromCartLagi = id =>{
    return {type: REMOVE_FROM_CART_LAGI, lid: id}
}