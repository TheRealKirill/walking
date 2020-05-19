import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { userReducer } from "./lib/user";

const reducers = combineReducers({
  user: userReducer,
});

const store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;
