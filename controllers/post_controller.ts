import * as Location from "../models/location_model";
import { checkToken } from "../modules/check_token";

import { apiResponseTYPE } from "../src/types";

export const list = (
  props: { query: { [index: string]: string }; token: string },
  callback: (arg0: apiResponseTYPE) => void
) => {
  checkToken(props.token, (r: apiResponseTYPE) => {
    if (!r.status) {
      callback(r);
    } else {
      // request User model
      Location.list((modelResponse: apiResponseTYPE) => {
        callback(modelResponse);
      });
    }
  });
};
