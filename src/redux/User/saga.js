import {takeEvery, all, call, put} from 'redux-saga/effects';
import constant from '../../config/constant';
import * as NavigationService from '../../services/NavigationService';
import {login, storeData, StoreUserAllData} from '../../services/userService';
import {sucessCall} from './action';
import types from './types';

export function* getLogin({payload}) {
  console.log('payload saga', payload);
  try {
    const data = yield call(login, payload);

    if (data) {
      yield put(sucessCall(data));
      yield call(storeData, data);
      yield call(StoreUserAllData, data);
      NavigationService.navigate('HomeScreen');
    }
  } catch (e) {
    // if (typeof e === 'string') yield put(errorAlert(e));
    // else if (typeof e.error === 'string') yield put(errorAlert(e.error));
    // else yield put(errorAlert('Unable to get Skills'));
    console.log('error saga', e);
  }
}

export function* getLoginFlow() {
  yield takeEvery(types.FETCH_LOGIN, getLogin);
}

export default function* userSagas() {
  yield all([getLoginFlow()]);
}
