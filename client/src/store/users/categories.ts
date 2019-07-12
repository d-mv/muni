import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { get } from "../services";

export const getCategories = () => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
) =>
  get({ url: "/categories" })
    .then(response => {
      dispatch({
        type: "SET_CATEGORIES",
        payload: response.data
      });
    })
    .catch((e: any) => {
      console.log(e);
    });
