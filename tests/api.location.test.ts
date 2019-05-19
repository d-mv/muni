import {callAPI} from './call_api'

// welcome from api
test("Server returns answer", async () => {
  try {
    const answer = await callAPI("");
    expect(typeof answer).toBe("object");
    expect(answer.status).toBe(true);
    expect(answer.message).toBe("Welcome to the API");
  } catch (e) {
    console.log(e);
  }
});
test("Server returns list of locations", async () => {
  try {
    const answer = await callAPI("/location");
    expect(typeof answer).toBe("object");
    expect(answer.status).toBe(true);
    expect(answer.message).toBe("List of locations");
  } catch (e) {
  }
});
