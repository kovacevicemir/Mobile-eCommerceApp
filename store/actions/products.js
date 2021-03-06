import Product from "../../models/Product";

//ACTION NAMES
export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const SET_PRODUCTS = "SET_PRODUCTS";

//ACTION CREATORS

//@delete product
export const deleteProduct = (productId) => {
  return async (dispatch, getState) =>{
    const token = getState().auth.token
    const response = await fetch(
      `https://simpleshop-96254.firebaseio.com/products/${productId}.json?auth=${token}`,
      {
        method: "DELETE"
      }
    );

    if(!response.ok){
      throw new Error('Something went wrong!');
    }

    dispatch({type: DELETE_PRODUCT, payload: productId});
  }
};

//@create product
export const createProduct = (title, description, imageUrl, price) => {
  return async (dispatch, getState) =>{
    const token = getState().auth.token
    const userId = getState().auth.userId

    console.log('Attempting to create product...');
    const response = await fetch(
      `https://simpleshop-96254.firebaseio.com/products.json?auth=${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          imageUrl,
          price,
          ownerId:userId
        }),
      }
    );

    const resData = await response.json();
    console.log('resData: ',resData)

    dispatch({
      type: CREATE_PRODUCT,
      payload: { id: resData.name, userId, title, description, imageUrl, price },
    });
  };
};

//@update product
export const updateProduct = (id, title, description, imageUrl) => {
  return async (dispatch, getState) =>{
    const token = getState().auth.token
    //change things on server
    const response = await fetch(
      `https://simpleshop-96254.firebaseio.com/products/${id}.json?auth=${token}`,
      {
        method:'PATCH',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          imageUrl
        }),
      }
    );

    if(!response.ok){
      throw new Error('Something went wrong!');
    }

    //as usual change state 
    dispatch({
      type: UPDATE_PRODUCT,
      payload: { id, title, description, imageUrl },
    });
  }

  
};

//@get all the products from firebase
export const fetchProducts = () => {
  return async (dispatch, getState) => {

    try {
      //get the data from firebase
      const response = await fetch(
        "https://simpleshop-96254.firebaseio.com/products.json"
      );

      if(!response.ok){
        throw new Error('Something went wrong!');
      }

      const resData = await response.json();

      const userId = getState().auth.userId

      const loadedProducts = [];
      for (const key in resData) {
        loadedProducts.push(
          new Product(
            key,
            resData[key].ownerId,
            resData[key].title,
            resData[key].imageUrl,
            resData[key].description,
            resData[key].price
          )
        );
      }

      const userProducts = loadedProducts.filter(prod => prod.ownerId === userId)

      //dispatch
      dispatch({ 
        type: SET_PRODUCTS, 
        payload: {
          loadedProducts,
          userProducts:loadedProducts.filter(prod=>prod.ownerId === userId) 
        }
      });

    } catch (err) {
      //send to some analytic or something
      throw(err)
    }

  };
};
