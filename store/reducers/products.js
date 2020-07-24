//PRODUCTS REDUCER

import PRODUCTS from "../../data/dummy-data";
import { DELETE_PRODUCT } from "../actions/products";

const initialState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter((prod) => prod.ownerId === "u1"),
};

//CART REDUCER LOGIC
export default (state = initialState, action) => {
  switch (action.type) {
    case DELETE_PRODUCT:
      const productId = action.payload;
      return {
        ...state,
        userProducts: state.userProducts.filter(
          (product) => product.id !== productId
        ),
        availableProducts: state.availableProducts.filter(
          (product) => product.id !== productId
        ),
      };

    default:
      return state;
  }
};
