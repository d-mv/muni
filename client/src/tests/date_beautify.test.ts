import dateBeautify from "../modules/date_beautify";

const testData = "2019-05-16T07:23:00.606Z";
const wrongData = "2019-0mlkml5-16T07:23:00.606Z";

const foreignReply = "מאי 16, 2019";

describe("Date Beautify", () => {
  it("returns empty, if data is missing", () => {
    const result = dateBeautify("", "");
    expect(result).toStrictEqual("");
  });
  it("returns empty, if data is malformed", () => {
    const result = dateBeautify(wrongData, "en");
    expect(result).toStrictEqual("");
  });
  it("returns English if no language supplied/present", () => {
    const result = dateBeautify(testData, "ru");
    expect(result).toStrictEqual("May 16, 2019");
  });
  it("returns beautified", () => {
    const result = dateBeautify(testData, "עב");
    expect(result).toStrictEqual(foreignReply);
  });
});
