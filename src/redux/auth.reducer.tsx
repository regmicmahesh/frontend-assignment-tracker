import { Reducer } from "redux";
import * as ACTION_TYPES from "./actionTypes";
import { Actions } from "./auth.action";


export type User = {
  id?: number;
  username: string;
  profile_picture: string | null;
  teacher_id: number | null;
  teacher?: User;
  teacher_code: string | null;
  role: "TEACHER" | "STUDENT";
};

type AuthState = {
  user?: User;
  isAuthenticated: boolean;
};
const initialState: AuthState = {
  isAuthenticated: false,
  user: undefined,
};

export const authReducer: Reducer<AuthState, Actions> = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.AUTH_LOGIN:
      return { ...state, user: action.payload.user, isAuthenticated: true };
    case ACTION_TYPES.AUTH_LOGOUT:
      return { ...state, user: undefined, isAuthenticated: false };
    case ACTION_TYPES.TEACHER_CODE_CHANGE:
      return { ...state, user: { ...state.user!, teacher_code: action.payload.code } };
    case ACTION_TYPES.TEACHER_ID_CHANGE:
      return {...state, user: {...state.user!, teacher_id: action.payload.id}}
    default:
      return state;
  }
};
