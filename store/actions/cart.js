//ACTION NAMES
export const ADD_TO_CART = 'ADD_TO_CART';


//ACTION CREATOR`S
export const addToCart = (product) =>{
    return { type: ADD_TO_CART, payload: product}
}