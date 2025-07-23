import { applyMiddleware, combineReducers, createStore } from "redux";
import storage from 'redux-persist/lib/storage'; // uses localStorage
import { thunk } from "redux-thunk";
import { persistReducer, persistStore } from 'redux-persist';
import dataReducer from "./data";
import authReducer from "./authReducer";

const persistConfig = {
  key: 'root',
  storage,
};
let reducers = combineReducers({
  data:dataReducer,
  auth:authReducer
})
const persistedReducer = persistReducer(persistConfig, reducers);

let store = createStore(persistedReducer,applyMiddleware(thunk))
export const persistor = persistStore(store);

window.store=store
export default store