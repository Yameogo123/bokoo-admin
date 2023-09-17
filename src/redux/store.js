import { combineReducers } from "redux";
import { userReducer } from "./reducer";
import { legacy_createStore as createStore} from 'redux'
import { loadState, saveState } from "./localStorage";
import throttle from 'lodash.throttle';

let reducers= combineReducers({
    "userReducer": userReducer
})


const persistedState = loadState();

const store = createStore(
    reducers,
    persistedState
);

store.subscribe(throttle(() => {
    saveState({
        "userReducer": store.getState().userReducer
    });
}, 1000));




export default store;