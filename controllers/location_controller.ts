import * as User from "../models/user_model";
import * as Location from "../models/location_model";
// import { checkToken } from "../modules/check_token";
import { requestError } from "../modules/response_message";
import * as TYPE from "../src/types";

import { checkTokenLength, dropQuotes } from "../modules/check_strings";

/** Get the list of locations
 * @function list
 * @param  {object} props - Request in the form of {query:{[index:string]:string};token:string}
 * @return {} - Uses callback to return standard apiResponse
 */
export const list = (callback: (arg0: TYPE.apiResponse) => void) => {
  Location.list((modelResponse: TYPE.apiResponse) => {
    callback(modelResponse);
  });
};

export const create = (
         query: any,
         // query: IncNewLocationTYPE,
         callback: (arg0: TYPE.apiResponse) => void
       ) => {
         const nameEnExists = query.name.en ? true : false;
         const photoExists = query.photo ? true : false;
         if (nameEnExists && photoExists) {
           const nameSize = query.name.en.length > 0;
           const photoSize = query.photo.length > 0;
           if (nameSize && photoSize) {
             Location.create(query, (modelResponse: TYPE.apiResponse) => {
               callback(modelResponse);
             });
           } else {
             callback(requestError("English name and/or photo is empty"));
           }
         } else {
           callback(requestError("English name and/or photo is missing"));
         }
       };

export const update = (
         location: string,
         query: { [index: string]: string },
         callback: (arg0: TYPE.apiResponse) => void
       ) => {
         // check su token
         Location.update(location, query, (modelResponse: TYPE.apiResponse) => {
           callback(modelResponse);
         });
       };

export const deleteLocation = (
  location: string,
  callback: (arg0: TYPE.apiResponse) => void
) => {
  Location.deleteLocation(location, (modelResponse: TYPE.apiResponse) => {
    callback(modelResponse);
  });
};
