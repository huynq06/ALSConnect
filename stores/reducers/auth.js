import {
  AUTHENTICATE,
  SET_DID_TRY_AL,
  IS_DISSMISS,
  LOGOUT
} from "../actions/auth";

const initialState = {
  userId: null,
  token: null,
  didTryAutoLogin: false,
  dissMiss: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        userId: action.userId,
        token: action.token,
        didTryAutoLogin: true,
        dissMiss: true
      };
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
