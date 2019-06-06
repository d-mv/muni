import shortText from "../modules/short_text";

const testData =
  "React Hook React.useEffect has missing dependencies: 'cookies' and 'props'. Either include them or remove the dependency array. However, 'props' will change when *any* prop changes, so the preferred fix is to destructure the 'props' object outside of the useEffect call and refer to those specific props inside React.useEffect";
const wrongData = () => {
  return "this is function, instead of string";
};
const reply =
  "React Hook React.useEffect has missing dependencies: 'cookies' and 'props'. Either include them or r...";

describe("Short Text", () => {
  it("returns empty, if data is missing", () => {
    // @ts-ignore
    const result = shortText("", "");
    expect(result).toStrictEqual("");
  });
  it("returns empty, if data is malformed", () => {
    // @ts-ignore
    const result = shortText(wrongData, 100);
    expect(result).toStrictEqual("");
  });
  it("returns short", () => {
    const result = shortText(testData, 100);
    expect(result).toStrictEqual(reply);
  });
  it("if length of original text, less that requested - don't add the '...", () => {
    const result = shortText('Well, let me be the test text',30);
    expect(result).toStrictEqual("Well, let me be the test text");
  });
});
