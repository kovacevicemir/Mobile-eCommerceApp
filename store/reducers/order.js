import { ADD_ORDER, SET_ORDERS } from "../actions/order";
import Order from "../../models/Order";

//REDUCER
const initialState = {
  orders: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_ORDER:
      const {id, items, amount, date} = action.payload

      const newOrder = new Order(
        id,
        items,
        amount,
        date
      );

      return {
          ...state,
          orders: state.orders.concat(newOrder)
      }

    case SET_ORDERS:
      return {
        orders:action.payload
      }

    default:
      return state;
  }
};
