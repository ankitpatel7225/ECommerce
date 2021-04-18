import types from './types';

export const fetchUser = (payload) => ({
  type: types.FETCH_LOGIN,
  payload,
});

export const sucessCall = (payload) => ({
  type: types.SUCCESS_LOGIN,
  payload,
});
export const failerCall = (payload) => ({
  type: types.FAILER_LOGIN,
  payload,
});
export const setUserData = (payload) => ({
  type: types.SET_LOGIN_DATA,
  payload,
});
export const removeUserData = (payload) => ({
  type: types.REMOVE_LOGIN_DATA,
  payload,
});
