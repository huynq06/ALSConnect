import AsyncStorage from "@react-native-async-storage/async-storage";
export const LOGOUT = "LOGOUT";
export const AUTHENTICATE = "AUTHENTICATE";
export const SET_DID_TRY_AL = "SET_DID_TRY_AL";
export const IS_DISSMISS = "IS_DISSMISS";
export const setDidTryAL = () => {
  return { type: SET_DID_TRY_AL };
};
export const setAppLauched = () => {
  return {
    type: IS_DISSMISS,
  };
};
export const authenticate = (userId, token) => {
  return (dispatch) => {
    dispatch({ type: AUTHENTICATE, userId: userId, token: token });
  };
};
export const logOutHandle = () => {
  return (dispatch) => {
    dispatch({ type: LOGOUT });
  };
};
export const login = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(
      "http://14.160.23.141:3434/api/Users/authenticate",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: email,
          password: password,
          rememberMe: true,
        }),
      }
    );
    if (!response.ok) {
      const errorResData = await response.toString();
      throw new Error('Co loi xay ra');
    }
    const resData = await response.json();
    dispatch(authenticate(resData.id, resData.token));
    const expirationDate = new Date(
      new Date().getTime() + 300 * 1000
    );
    saveDataToStorage(resData.id, resData.token,expirationDate);
  };
};
export const signup = (email,user,password) =>{
  return async (dispatch) =>{
    const response = await fetch('http://14.160.23.141:3434/api/Users/register',{
      method:'POST',
      headers:{
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Email: email,
        UserName: user,
        Password: password
      }),
    })
    const resData = await response.json();
    if(!response.ok){
      const errorResData = await response.json();
    //  const errorId = errorResData.error.message;
      let message = 'Something went wrong!';
      if (errorResData.message) {
        message = errorResData.message;
      }
      throw new Error(message);
    }
    //  const resData = await response.json();
    // dispatch(authenticate(resData.id, resData.token));
    // saveDataToStorage(resData.id, resData.token);
  }
 }
export const logout =  () => {
  return async (dispatch) => {
 //   await AsyncStorage.removeItem("isAppFirstLaunched");
    await AsyncStorage.removeItem("userData");
    dispatch(logOutHandle());
  };
};
/* export const logout = () => {
   AsyncStorage.removeItem("isAppFirstLaunched");
   AsyncStorage.removeItem("userData");
  return { type: LOGOUT };
}; */
const saveDataToStorage = (userId,token,expirationDate) => {
  AsyncStorage.setItem(
    "userData",
    JSON.stringify({
      token: token,
      userId: userId,
      expiryDate: expirationDate.toISOString()
    })
  );
};
