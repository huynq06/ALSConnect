import AsyncStorage from "@react-native-async-storage/async-storage";
export const LOGOUT = "LOGOUT";
export const AUTHENTICATE = "AUTHENTICATE";
export const SET_DID_TRY_AL = "SET_DID_TRY_AL";
export const IS_DISSMISS = "IS_DISSMISS";
export const SET_AVATAR = 'SET_AVATAR'
export const RESET_PASSWORD = 'RESET_PASSWORD'
export const setDidTryAL = () => {
  return { type: SET_DID_TRY_AL };
};
export const setAppLauched = () => {
  return {
    type: IS_DISSMISS,
  };
};
export const authenticate = (userId, token,userName,avatarUrl) => {
  return (dispatch) => {
    dispatch({ type: AUTHENTICATE, userId: userId, token: token,userName:userName,avatarUrl:avatarUrl });
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
    dispatch(authenticate(resData.id, resData.token,resData.name,resData.avatarUrl));
    const expirationDate = new Date(
      new Date().getTime() + 300 * 1000
    );
    saveDataToStorage(resData.id, resData.token,expirationDate);
  };
};
export const changePassword = (currentPassword,newPassword) =>{
  return async (dispatch,getState) => {
    const userName = getState().auth.userName;
    const response = await fetch(
      "http://14.160.23.141:3434/api/Users/changePassword",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: userName,
          currentPassWord: currentPassword,
          newPassWord: newPassword,
        }),
      }
    );
    if (!response.ok) {
      const errorResData = await response.json();
      let message = 'Something went wrong!';
      if(errorResData.message=='Incorrect password.'){
        message = "WRONG PASSWORD"
      }else{
        message = "ERROR OCCURRED"
       
      }
      throw new Error(message);
    }
  };
}
export const resetPassword = (email) =>{
  return async ()=>{
    const response =  await fetch(
      "http://14.160.23.141:3434/api/email/send",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          receiverId: email,
          userName: "",
        }),
      }
    );
    console.log('Send Email Response: ',response);
    if (!response.ok) {
      let message = 'Something went wrong!';
      throw new Error(message);
    }
    const errorResData = await response.json();
    console.log('Send Email errorResData',errorResData.isSuccess)
    if (!response.isSuccess) {
      let message = 'Something went wrong!';
      if (errorResData.message === 'Email Not exist') {
        message = 'EMAIL NOT FOUND!';
      } 
      throw new Error(message);
    }
  }
  

}
export const changeAvatar = (avatarUrl) =>{
  return async (dispatch,getState) => {
    const userName = getState().auth.userName;
    const response = await fetch(
      "http://14.160.23.141:3434/api/Users/changeAvatar",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: userName,
          avatarUrl: avatarUrl,
        }),
      }
    );
    if (!response.ok) {
      const errorResData = await response.json();
      let message = 'Something went wrong!';
      throw new Error(message);
    }
    dispatch({ type: SET_AVATAR, avatarUrl: avatarUrl });
  };
}
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
      let message = 'Something went wrong!';
      if (!resData.isSuccessed) {
        message = resData.message;
      }
      throw new Error(message);
    }
  }
 }
export const logout =  () => {
  return async (dispatch) => {
    await AsyncStorage.removeItem("userData");
    dispatch(logOutHandle());
  };
};
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
