import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { Action } from "./types";

import { AnyAction } from "redux";

export * from "./auth";
export * from "./categories";
export * from "./settings";

export const setToken = (token: string): Action => {
  return { type: "SET", token };
};

export const setLoading = (loading: boolean): Action => ({
  type: "SET_LOADING",
  loading
});

export const setModule = (
  module: string
): ThunkAction<Promise<void>, {}, {}, AnyAction> => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
): Promise<void> => {
  dispatch({ type: "SET_MODULE", module });
};

export const setMessage = (message: string) => ({
  type: "SET_MESSAGE",
  message: message
});
