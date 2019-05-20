import { apiResponseTYPE } from "../src/types";

export const updateMessage = (props: {
  subj: string;
  document: { ok: number; nModified: number };
}) => {
  let response: apiResponseTYPE = {
    status: false,
    message: "Error in updating the DB",
    code: 500
  };
  // if OK
  if (props.document.ok === 1) {
    // set response
    (response.status = true),
      (response.message = `${props.subj} has been updated`);
    response.code = 200;
    // if not updated
    if (props.document.nModified === 0) {
      response.message = `${
        props.subj
      } data is the same, no modifications done`;
    }
  }
  return response;
};

export const errorMessage = (props: { action: string; e: any }) => {
  return {
    status: false,
    message: `Error in ${props.action}. Contact administrator. Details: (${
      props.e
    })`,
    code: 500
  };
};

export const notFound = (subj: string) => {
  return {
    status: false,
    message: `No ${subj} found in the DB`,
    code: 203
  };
};
export const requestError = (subj: string) => {
  return {
    status: false,
    message: `Error. ${subj}`,
    code: 400
  };
};
