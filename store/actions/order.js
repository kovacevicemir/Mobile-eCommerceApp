//Action names
export const ADD_ORDER = 'ADD_ORDER';

//Action creator`s
export const addOrder = (cartItems, totalAmount) => {
    return {type:ADD_ORDER, payload:{items:cartItems, amount:totalAmount}}
}