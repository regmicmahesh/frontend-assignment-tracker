import * as ACTION_TYPES from "./actionTypes";

type AddPageAction = {
  readonly type: typeof ACTION_TYPES.PAGE_ADD;
  readonly payload: { pageName: string };
};

type RemovePageAction = {
  readonly type: typeof ACTION_TYPES.PAGE_REMOVE;
};

type ChangePageAction = {
  readonly type: typeof ACTION_TYPES.PAGE_CHANGE;
  readonly payload: { pageName: string };
};


export type Actions = AddPageAction | RemovePageAction | ChangePageAction;

export const changePage = (page: string): ChangePageAction => {
  return { type: "page/change", payload: { pageName: page } };
};

export const removePage = (): RemovePageAction => ({type: "page/remove"});


export const addPage = (page: string): AddPageAction => {
  return {type: "page/add", payload: {pageName: page}}
}
