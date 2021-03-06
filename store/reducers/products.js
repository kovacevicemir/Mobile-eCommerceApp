//PRODUCTS REDUCER

import PRODUCTS from "../../data/dummy-data";
import {
  DELETE_PRODUCT,
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
  SET_PRODUCTS
} from "../actions/products";
import Product from "../../models/Product";

const initialState = {
  availableProducts: [],
  userProducts: [],
};

//reducer logic
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      const products = action.payload.loadedProducts
      const userprod = action.payload.userProducts
      
      return {
        userProducts:userprod,
        availableProducts:products,
      }

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

    case CREATE_PRODUCT:
      const productInputs = action.payload;
      const newProduct = new Product(
        productInputs.id,
        productInputs.userId,
        productInputs.title,
        productInputs.imageUrl,
        productInputs.description,
        productInputs.price
      );

      return {
        ...state,
        availableProducts: state.availableProducts.concat(newProduct),
        userProducts: state.availableProducts.concat(newProduct),
      };

    case UPDATE_PRODUCT:
      const editedProductInputs = action.payload;

      //userProducts
      const productIndex = state.userProducts.findIndex(
        (prod) => prod.id === editedProductInputs.id
      );

      const updatedProduct = new Product(
        editedProductInputs.id,
        state.userProducts[productIndex].ownerId,
        editedProductInputs.title,
        editedProductInputs.imageUrl,
        editedProductInputs.description,
        state.userProducts[productIndex].price
      );

      const updatedUserProducts = [...state.userProducts];
      updatedUserProducts[productIndex] = updatedProduct;

      //availableProducts
      const availableProductIndex = state.availableProducts.findIndex(
        (prod) => prod.id === editedProductInputs.id
      );

      const updatedAvailableProducts = [...state.availableProducts];
      updatedAvailableProducts[availableProductIndex] = updatedProduct

      return {
        ...state,
        availableProducts: updatedAvailableProducts,
        userProducts: updatedUserProducts
      }

    default:
      return state;
  }
};
