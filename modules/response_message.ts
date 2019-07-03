import { apiResponse } from "../src/types";

export const updateMessage = (props: {
  subj: string;
  document: { ok: number; nModified: number };
}) => {
  let response: apiResponse = {
    status: false,
    message: "Error in updating the DB",
    code: 500
  };
  // if OK
  if (props.document.ok === 1) {
    // set response
    (response.status = true),
      (response.message = `${props.subj} has been updated/deleted`);
    response.code = 200;
    // if not updated
    if (props.document.nModified === 0) {
      response.message = `${props.subj} data is the same, no modifications done`;
    }
  }
  return response;
};

export const errorMessage = (props: { action: string; e: any }) => {
  return {
    status: false,
    message: `Error in ${props.action}. Contact administrator. Details: (${props.e})`,
    code: 500
  };
};
export const tooManyResultsMessage = (subj: string) => {
  return {
    status: false,
    message: `Error in ${subj}. Too many results`,
    code: 500
  };
};
export const wrongDbMessage = (subj: string) => {
  return {
    status: false,
    message: `Error in DB/system. Reason: ${subj}`,
    code: 500
  };
};

export const alreadyExistsMessage = (subj: string) => {
  return {
    status: false,
    message: `${subj} already exists.`,
    code: 400
  };
};
export const foundMessage = (subj: string, payload?: any) => {
  return {
    status: true,
    message: `${subj} found.`,
    code: 200,
    ...payload
  };
};
export const notAllowedToGetResultsMessage = (subj: string) => {
  return {
    status: false,
    message: `You don't have sufficient rights to ${subj}.`,
    code: 401
  };
};
export const notAuthMessage = (subj: string) => {
  return {
    status: false,
    message: `Not authorized. Reason: ${subj}.`,
    code: 401
  };
};

export const notFound = (subj: string) => {
  return {
    status: false,
    message: `No ${subj} found.`,
    code: 404
  };
};
export const requestError = (subj: string) => {
  return {
    status: false,
    message: `Error. ${subj}`,
    code: 406
  };
};
export const generalError = (props: { subj: string; code: number }) => {
  return {
    status: false,
    message: props.subj,
    code: props.code
  };
};
export const positiveMessage = (props: {
  subj: string;
  code?: number;
  payload?: [] | any;
}) => {
  let message = {
    status: true,
    message: props.subj,
    code: props.code || 200
  };
  if (Array.isArray(props.payload)) {
    return { ...message, payload: props.payload };
  } else {
    return { ...message, ...props.payload };
  }
};
// v2
export const positive = (props: {
  subj: string;
  code?: number;
  payload?: any;
}) => {
  let message = {
    status: true,
    message: props.subj,
    code: props.code || 200
  };
  return { ...message, payload: props.payload };
};

// v2
export const negative = (props: {
  subj: string,
  code?: number,
  payload?:any
}) => {
  let message = {
    status: false,
    message: props.subj,
    code: props.code || 406
  };
  return { ...message, payload: props.payload };
}
