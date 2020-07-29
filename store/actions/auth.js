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
        throw new Error('Something went wrong!');
    }

    const resData = await response.json()
    console.log(resData)
    //userid, token etc...
    dispatch({ type: SIGNUP, payload: { email, password } });
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
        throw new Error('Something went wrong!');
    }

    const resData = await response.json()
    console.log(resData)
    //userid, token etc...
    dispatch({ type: LOGIN, payload: { email, password } });
  };
};
