import { get, post, patch } from "../services";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import data from "../../data/translation.json";
import { indexedObjAny } from "../types";

const importedData: indexedObjAny = data;

export const setLanguage = (user: string, language: string) => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {
  dispatch({
    type: "SET_LANGUAGE",
    data: importedData.language[language]
  });
  if (user) {
    patch({
      url: "/users/settings",
      body: { language }
    })
      .then(response => {
        console.log(response)
        const { _id, location, type, settings } = response.data;
        dispatch({
          type: "SET_AUTH",
          payload: { status: true, user: { _id, location, type, settings } }
        });})
      .catch((e: any) => {
        console.log(e);
      });
  }
};

export const showHelp = (show: boolean) => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {
  dispatch({
    type: "SHOW_HELP",
    show
  });
  patch({
    url: "/users/settings",
    body: { help: false }
  })
    .then(response => {
      const { _id, location, type, settings } = response.data;
      dispatch({
        type: "SET_AUTH",
        payload: { status: true, user: { _id, location, type, settings } }
      });
    })
    .catch((e: any) => {
      console.log(e);
    });
};
