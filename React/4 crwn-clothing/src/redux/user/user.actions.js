// {
//     type: "アクションの種類を一意に識別できる文字列またはシンボル",
//     payload: "アクションの実行に必要な任意のデータ",
// }

export const setCurrentUser = user => ({
    type: 'SET_CURRENT_USER',
    payload: user
});


