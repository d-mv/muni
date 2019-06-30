import { verifyToken } from "../modules/security";
import { getLocationId } from "../models";
import { apiResponse } from "src/types";

export const checkUserById = (
  token: string,
  callback: (arg0: apiResponse) => void
) =>
  verifyToken(token).then((response: any) => {
    if (response.status) {
      getLocationId(response.payload._id, (result: any) => callback(result));
    } else {
      callback(response);
    }
  });
