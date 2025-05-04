import { legacy_createStore as createStore } from 'redux'

const initialState = {
    sidebarShow: true,
    theme: 'light',
    user: null,
}

const changeState = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USER':
            return { ...state, user: action.payload }
        default:
            return state
    }
}

const store = createStore(changeState)
export default store
