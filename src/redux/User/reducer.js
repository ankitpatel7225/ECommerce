import types from './types';

const initialState = {
  loading: false,
  userData: '',
  status: '',
  error: '',
  isLogin: false,
};
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_LOGIN:
      return {
        ...state,
        loading: true,
      };
    case types.FAILER_LOGIN:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case types.SUCCESS_LOGIN:
      return {
        ...state,
        userData: action.payload,
        isLogin: true,
        loading: false,
        error: null,
      };
    case types.REMOVE_LOGIN_DATA:
      return initialState;

    default:
      return state;
  }
};

export default userReducer;
