import * as ACTION_TYPES from "./actionTypes";
import { User } from "./auth.reducer";

type LoginAction = {
  readonly type: typeof ACTION_TYPES.AUTH_LOGIN;
  readonly payload: { user: any };
};

type LogoutAction = {
  readonly type: typeof ACTION_TYPES.AUTH_LOGOUT;
  readonly payload?: "";
};

type ChangeCodeAction = {
  readonly type: typeof ACTION_TYPES.TEACHER_CODE_CHANGE;
  readonly payload: { code: string };
};

type ChangeTeacherIdAction = {
  readonly type: typeof ACTION_TYPES.TEACHER_ID_CHANGE;
  readonly payload: { id: number };
};

//combining actions
export type Actions = LoginAction | LogoutAction | ChangeCodeAction | ChangeTeacherIdAction;

//export const loginThunk =
//  (user: User): Promise<any> =>
//  async (dispatch: Dispatch<Actions>) => {
//    dispatch({
//      type: ACTION_TYPES.AUTH_LOGIN,
//      payload: { token: "asdf", user: {} as User },
//    });
//  };

export const login = (user: User): LoginAction => {
  return { type: ACTION_TYPES.AUTH_LOGIN, payload: { user } };
};

export const logout = (): LogoutAction => {
  return { type: ACTION_TYPES.AUTH_LOGOUT };
};

export const changeCode = (code: string): ChangeCodeAction => {
  return { type: ACTION_TYPES.TEACHER_CODE_CHANGE, payload: { code } };
};

export const changeTeacherId = (id: number): ChangeTeacherIdAction => {
  return { type: ACTION_TYPES.TEACHER_ID_CHANGE, payload: { id } };
};
