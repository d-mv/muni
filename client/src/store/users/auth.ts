import axios from "axios";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { get } from "../services";

export const checkToken = (
  token: string
): ThunkAction<Promise<void>, {}, {}, AnyAction> => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
): Promise<void> =>
  get({ url: "/v2/check", headers: { token } })
    .then(response => {
      // set auth true
      dispatch({ type: "SET_AUTH", payload: response.data.payload });
      dispatch({ type: "SET", token: token });
    })
    .catch(e => {});
