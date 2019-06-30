import { LoginProps } from "./../src/types";
import { verifyToken, createToken } from "../modules/security";
import { getLocationId, loginUser, getCategories } from "../models";
import { apiResponse } from "src/types";
import * as Message from "../modules/response_message";

export const checkUserById = (
  token: string,
  callback: (arg0: apiResponse) => void
) =>
  verifyToken(token).then((response: any) => {
    if (response.status) {
      getLocationId(response.payload._id, (result: any) => {
        if (result.status) {
          getCategories((catResult: apiResponse) => {
            if (catResult.status) {
              const token = createToken(result.payload._id);
              const payload = {
                ...result.payload,
                token,
                categories: catResult.payload
              };
              // attach token
              callback({ ...result, payload });
            } else {
              callback(catResult);
            }
          });
        } else {
          callback(result)
        }
      });
    } else {
      callback(response);
    }
  });

export const login = (
  request: LoginProps,
  callback: (arg0: apiResponse) => void
) => {
  const check: boolean =
    request.email.length > 0 && request.password.length > 0;
  if (check) {
    loginUser(request, (result: apiResponse) => {
      console.log(result);
      if (result.status) {
        // make token
        getCategories((catResult: apiResponse) => {
          if (catResult.status) {
            const token = createToken(result.payload._id);
            const payload = {
              ...result.payload,
              token,
              categories: catResult.payload
            };
            // attach token
            callback({ ...result, payload });
          } else {
            callback(catResult);
          }
        });
        // return
      } else {
        callback(result);
      }
    });
  } else {
    callback(Message.requestError("login is empty"));
  }
};
