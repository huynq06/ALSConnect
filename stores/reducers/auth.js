import {
  AUTHENTICATE,
  SET_DID_TRY_AL,
  IS_DISSMISS,
  LOGOUT,
  SET_AVATAR,
  UPDATE_DETAIL
} from "../actions/auth";

const initialState = {
  userId: null,
  userName:'',
  token: null,
  didTryAutoLogin: false,
  dissMiss: false,
  avatarUrl:'',
  email:'',
  cccd:'',
  city:'',
  fullName:'',
  district:'',
  ward:'',
  detail:'',
  dob:''

};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        userId: action.userId,
        token: action.token,
        userName: action.userName,
        didTryAutoLogin: true,
        dissMiss: true,
        avatarUrl: action.avatarUrl,
        email: action.email,
        cccd: action.cccd,
        city: action.city,
        fullName: action.fullName,
        district: action.district,
        ward: action.ward,
        detail: action.detail,
        dob: action.dob
      };
      case UPDATE_DETAIL:
        return{
          ...state,
          cccd: action.cccd,
          city: action.city,
          fullName: action.fullName,
          district: action.district,
          ward: action.ward,
          detail: action.detail,
          dob: action.dob
        }
     case SET_AVATAR:
       return{
         ...state,
         avatarUrl: action.avatarUrl
       }
    case SET_DID_TRY_AL:
      return {
        ...state,
        didTryAutoLogin: true,
      };
    case IS_DISSMISS:
      return {
        ...state,
        dissMiss: true,
      };
      case LOGOUT:
        return {
         initialState
        };
    default:
      return state;
  }
};
