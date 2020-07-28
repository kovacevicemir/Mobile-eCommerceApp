//Action names
export const ADD_ORDER = "ADD_ORDER";

//Action creator`s
export const addOrder = (cartItems, totalAmount) => {
  return async (dispatch) => {
    //add it to the server
    const date = new Date()
    const response = await fetch(
        "https://simpleshop-96254.firebaseio.com/orders/u1.json",
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
