//CART REDUCER
import PRODUCTS from "../../data/dummy-data";
import {ADD_TO_CART} from "../actions/cart";
import CartItem from "../../models/CartItem";

//initial state
const initialState = {
  items: {},
  totalAmount: 0,
};

//reducer logic
export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const product = action.payload;

      //check if product is already in cart
      const cartItemId = product.id;
      if (state.items[cartItemId]) {
        const item = state.items[cartItemId]
        // item is already in cart
        const updatedCartItem = new CartItem(
            item.quantity + 1,
            item.productPrice,
            item.productTitle,
            item.sum + product.productPrice,

        )
        return {
            ...state,
            items:{...state.items, [cartItemId]:updatedCartItem},
            totalAmount: state.totalAmount + product.productPrice
        }

      } else {
        //create new cart item
        const cartItem = new CartItem(
          1,
          product.productPrice,
          product.productTitle,
          product.productPrice
        );

        //add product to cart
        return { 
                //copy state, copy items, add new item
                ...state,
                items: { ...state.items, [cartItemId]: cartItem },
                totalAmount: state.totalAmount + product.productPrice
            };
            
      }

    default:
      return state;
  }
  return state;
};
