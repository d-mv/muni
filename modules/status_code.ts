export const assignCode = (action: string = "", status: boolean = false) => {
  let response = action === "" && status ? 100 : 0;
  switch (action) {
    case 'auth':
      response = status ? 200 : 401;
      break;
    case "create":
      response = status ? 201 : 500;
      break;
    case "fetch":
      response = status ? 200 : 500;
      break;
    case "fetch_req":
      response = status ? 200 : 406;
      break;
    case "delete":
      response = status ? 200 : 500;
      break;
    default:
      response = 100;
  }
  return response;
};
