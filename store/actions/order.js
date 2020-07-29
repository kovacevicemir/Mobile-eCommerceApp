import Order from '../../models/Order'

//Action names
export const ADD_ORDER = "ADD_ORDER";
export const SET_ORDERS = "SET_ORDERS";

//Action creator`s

//@add order
export const addOrder = (cartItems, totalAmount) => {
  return async (dispatch, getState) =>{
    const token = getState().auth.token
    //add it to the server
    const date = new Date()
    const response = await fetch(
        `https://simpleshop-96254.firebaseio.com/orders/u1.json?auth=${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cartItems,
            totalAmount,
            date: date.toISOString()
          }),
        }
      );
  
      if(!response.ok){
          throw new Error('Something went wrong!');
      }

      const resData = await response.json()


    //as normal
    dispatch({
      type: ADD_ORDER,
      payload: { id:resData.name, items: cartItems, amount: totalAmount, date },
    });
  };
};

//@get orders
export const fetchOrders = () =>{
    return async dispatch =>{
        try {
            //get the data from firebase
            const response = await fetch(
              "https://simpleshop-96254.firebaseio.com/orders/u1.json"
            );
      
            if(!response.ok){
              throw new Error('Something went wrong!');
            }
      
            const resData = await response.json();
      
            const loadedOrders = [];
            for (const key in resData) {
              loadedOrders.push(
                new Order(
                    key,
                    resData[key].cartItems,
                    resData[key].totalAmount,
                    new Date(resData[key].date)
                )
              );
            }
      
            //dispatch as usual
            dispatch({type:SET_ORDERS, payload:loadedOrders})
      
          } catch (err) {
            //send to some analytic or something
            throw(err)
          }

    }
}
