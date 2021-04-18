import {all} from 'redux-saga/effects';
import userSagas from './User/saga';

export default function* rootSaga() {
  yield all([userSagas()]);
}
