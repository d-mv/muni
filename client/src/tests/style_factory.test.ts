import styleFactory from "../modules/style_factory";

const style = "thisIsGoingToBeTestStyleName";
const reply = "thisIsGoingToBeTestStyleNameRTL";

/**
* Suite of test to check if functions checks for validity of the input
*/
describe("Style Factory - props check", () => {
  it("returns empty, if data is missing", () => {
    const result = styleFactory("", "");
    expect(result).toStrictEqual("");
  });
  it("returns empty, if data is wrong/malformed - arg0 === []", () => {
    // @ts-ignore
    const result = styleFactory([""], "rtl");
    expect(result).toStrictEqual("");
  });
  it("returns original, if data is wrong/malformed - arg1 === 123", () => {
    // @ts-ignore
    const result = styleFactory(style, 123);
    expect(result).toStrictEqual(style);
  });
  it("returns original, if data is wrong/malformed - arg1 <> 'ltr'/'rtl'", () => {
    // @ts-ignore
    const result = styleFactory(style, 'direction');
    expect(result).toStrictEqual(style);
  });
});

describe("Style Factory - check if works", () => {
  it("returns unchanged, if direction = 'ltr'", () => {
    const result = styleFactory(style, "ltr");
    expect(result).toStrictEqual(style);
  });
  it("returns with RTL suffix, if direction === 'rtl'", () => {
    const result = styleFactory(style, "rtl");
    expect(result).toStrictEqual(reply);
  });
});
