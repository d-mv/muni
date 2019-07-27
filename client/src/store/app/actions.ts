import { Action } from "./types";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";

export * from "./locations";

export const setStep = (step: number): Action => {
  return { type: "SET_STEP", step };
};

export const setModule = (
  previous: string,
  next: string
): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    dispatch({ type: "PREV_MODULE", module: previous });
    dispatch({ type: "SET_MODULE", module: next });
  };
};