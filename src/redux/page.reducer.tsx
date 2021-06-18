import { Actions } from "./page.action";
import { Reducer } from "redux";
import * as ACTION_TYPES from "./actionTypes";

type PagesState = {
  pages: string[];
};

const initialState: PagesState = {
  pages: ["Dashboard"],
};

export const pageReducer: Reducer<PagesState, Actions> = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.PAGE_ADD:
      return { ...state, pages: [...state.pages, action.payload.pageName] };

    case ACTION_TYPES.PAGE_REMOVE:
      return { ...state, pages: state.pages.slice(0, state.pages.length - 1) };

    case ACTION_TYPES.PAGE_CHANGE:
      const pages = [...state.pages];
      pages[pages.length - 1] = action.payload.pageName;
      return { ...state, pages };

    default:
      return state;
  }
};
