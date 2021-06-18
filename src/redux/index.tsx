import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { authReducer } from "./auth.reducer";
export * from "./auth.action";

const reducer = combineReducers({
  auth: authReducer,
});

export const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export type StoreState = ReturnType<typeof store.getState>;

export type DispatchType = typeof store.dispatch;
