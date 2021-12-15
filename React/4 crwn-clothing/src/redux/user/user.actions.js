// {
//     type: "アクションの種類を一意に識別できる文字列またはシンボル",
//     payload: "アクションの実行に必要な任意のデータ",
// }

import { UserActionTypes } from './user.types';

export const setCurrentUser = user => ({
    type: UserActionTypes.SET_CURRENT_USER,
    payload: user
});


