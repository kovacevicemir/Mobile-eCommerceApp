//ACTION NAMES
export const SIGNUP = "SIGNUP";
export const LOGIN = "LOGIN"

//ACTION CREATORS
//@sign up
export const signup = (email, password) => {
  return async (dispatch) => {
    const response = 
    await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD4mF3tOFtP4l2Z7MwcIYF7q6B-OcaQHKM`,
    {
        method:'POST',
        headers: {
            "Content-Type": "application/json",
          },
        body: JSON.stringify({
            email,
            password,
            returnSecureToken: true
        })
    });

    if(!response.ok){
        const errorResData = await response.json();
        const errorId = errorResData.error.message;
        let message = 'Something went wrong!';
        if(errorId === 'EMAIL_EXISTS'){
            message = 'This email already exists'
        }

        throw new Error(message);
    }

    const resData = await response.json()
    console.log(resData)
    //userid, token etc...
    dispatch({ type: SIGNUP, payload: { token: resData.idToken, userId: resData.localId } });
  };
};

//@log in
export const login = (email, password) => {
  return async (dispatch) => {
    const response = 
    await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD4mF3tOFtP4l2Z7MwcIYF7q6B-OcaQHKM
    `,
    {
        method:'POST',
        headers: {
            "Content-Type": "application/json",
          },
        body: JSON.stringify({
            email,
            password,
            returnSecureToken: true
        })
    });

    if(!response.ok){
        const errorResData = await response.json();
        const errorId = errorResData.error.message;
        let message = 'Something went wrong!';
        if(errorId === 'EMAIL_NOT_FOUND'){
            message = 'This email does not exist'
        }else if(errorId === 'INVALID_PASSWORD'){
            message = 'This password is not valid'
        }

        throw new Error(message);
    }

    const resData = await response.json()
    //userid, token etc...
    dispatch({ type: LOGIN, payload: { token: resData.idToken, userId: resData.localId } });
  };
};
