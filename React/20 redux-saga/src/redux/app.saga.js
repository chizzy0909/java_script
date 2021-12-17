// Take — 只发射前n个items
// TakeLast — 只发射最后n个items
// TakeEvery - 将在每次 action 被匹配时一遍又一遍地被调用,并且它们也无法控制何时停止监听。
// delay操作符 - 延时发射Observable里面的事件

import { takeLatest, delay, put } from 'redux-saga/effects';

export function* onIncrement() {
  yield console.log('I am incremented');
  yield delay(2000);
  yield put({ type: 'INCREMENT_FROM_SAGA' });
}

export function* incrementSaga() {
  yield takeLatest('INCREMENT', onIncrement);
}
