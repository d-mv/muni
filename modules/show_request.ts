export const showRequest = (name: string, headers: any, params: any) => {
  console.log("\x1b[34m", "router - incoming request:");
  console.log("name");
  console.log(`>> ${name}`);
  console.log(headers);
  console.log(params);
  console.log("");
};
