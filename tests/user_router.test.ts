import { callAPI } from "./call_api";
import * as dotenv from "dotenv";

const dotEnv = dotenv.config();

it("Server requires token", async () => {
  const response = await callAPI("user/check");
  // const answer = response.error.response;
  expect(typeof response).toBe("object");
  expect(response.data.status).toBe(false);
  expect(response.status).toBe(400);
  expect(response.data.message).toBe("Token is missing");
});

it("Can't login with missing credentials", async () => {
  const request =
    `login?pass=${process.env.SU_PASS}&email=${process.env.SU_EMAIL}`;
  const response = await callAPI(request);
  expect(typeof response).toBe("object");
  expect(response.data.status).toBe(false);
  expect(response.status).toBe(400);
  expect(response.data.message).toBe("Location is missing");
});

// it("Can't login with missing credentials #2", async () => {
//   const request = `login?location=5ce2a3c945e5451171394b35&email=${process.env.SU_EMAIL}`;
//   const response = await callAPI(request);
//   expect(typeof response).toBe("object");
//   console.log(response)
  // expect(response.data.status).toBe(false);
  // expect(response.status).toBe(400);
  // expect(response.data.message).toBe("Location is missing");
// });

it("Logins as SU", async () => {
  const request =
    `login?pass=${process.env.SU_PASS}&location=5ce2a3c945e5451171394b35&email=${process.env.SU_EMAIL}`;
  const response = await callAPI(request);
  expect(typeof response).toBe("object");
  expect(response.status).toBe(true);
  expect(response.code).toBe(200);
  expect(response.message).toBe("SU login is OK");
});

