import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { get } from "../services";
import { AxiosResponse } from "axios";

export const fetchLocations = (): ThunkAction<
  Promise<void>,
  {},
  {},
  AnyAction
> => async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> =>
  get({ url: "/locations" })
    .then((response: AxiosResponse) => {
      dispatch({
        type: "FETCH_LOCATIONS",
        payload: response.data
      });
    })
    .catch(error => {
      const { message } = error.response
        ? error.response.data
        : error.toString();
      console.log(message);
    });
