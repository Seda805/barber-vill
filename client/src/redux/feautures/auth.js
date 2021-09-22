const initialState = {
    isLoggingIn: false,
    isSigningUp: false,
    isLoggingOut: false,
    isLoggedIn: false,
    error: null,
    success: null,
    person: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {

        //Регистрация нового пользователя
        case "auth/createNewUser/resetInfo" :
            return {...state, success: null, error: null, isSigningUp: false}

        case "auth/createNewUser/pending" :
            return {...state, success: null, error: null, isSigningUp: true }
        case "auth/createNewUser/rejected" :
            return {...state, error: action.error}
        case "auth/createNewUser/fulfilled" :
            return {...state, success: action.success}

        default:
            return state;
    }
}

export const createNewUser = (data) => async (dispatch) => {
    dispatch({type: "auth/createNewUser/pending"});

    const formData = new FormData();
    const { avatar } = data;

    for (let key in data ) {
        if (key === "avatar" && avatar) {
            formData.set("avatar", avatar[0]);
        } else {
            formData.set(key, data[key]);
        }
    }

    const res = await fetch("/api/signup", {
        method: "POST",
        body: formData,
    });
    const json = await res.json();

    if (json.error) {
        dispatch({type: "auth/createNewUser/rejected", error: json.error});
    } else {
        dispatch({type: "auth/createNewUser/fulfilled", success: json.success});
    }

}

export default reducer;

//Если пользователь зарегистрировался, то должен -будет- присвоиться токен, person должен быть заполнен;
// так же должны прийти либо ключ error, либо success; Если success - то он идёт дальше, через некоторый тайминг.
// При скрытии окна в стейте ключи error и success должны очиститься
//
//При выходе должен очиститься токен, и всё ему принадлежащее