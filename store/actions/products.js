import Product from '../../models/Product'

//ACTION NAMES
export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const SET_PRODUCTS = "SET_PRODUCTS";

//ACTION CREATORS

//@delete product
export const deleteProduct = (productId) => {
  return { type: DELETE_PRODUCT, payload: productId };
};

//@create product
export const createProduct = (title, description, imageUrl, price) => {
  return async (dispatch) => {
    const response = await fetch(
      "https://simpleshop-96254.firebaseio.com/products.json",
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
        }),
      }
    );

    const resData = await response.json();

    dispatch({
      type: CREATE_PRODUCT,
      payload: { id: resData.name, title, description, imageUrl, price },
    });
  };
};

//@update product
export const updateProduct = (id, title, description, imageUrl) => {
  return {
    type: UPDATE_PRODUCT,
    payload: { id, title, description, imageUrl },
  };
};

//@get all the products from firebase
export const fetchProducts = () => {
    console.log('glavonja')
  return async (dispatch) => {
    //get the data from firebase
    const response = await fetch("https://simpleshop-96254.firebaseio.com/products.json");
    const resData = await response.json();

    const loadedProducts = []
    for(const key in resData){
        loadedProducts.push(
            new Product(
                key,
                'u1',
                resData[key].title,
                resData[key].imageUrl,
                resData[key].description,
                resData[key].price
            )
        )
    }

    //dispatch
    dispatch({ type: SET_PRODUCTS, payload: loadedProducts });
  };
};
