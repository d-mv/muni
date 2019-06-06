import locationsList from "../modules/locations_list";

const testData = [
  { _id: "1234567890", name: { en: "Moscow", ru: "Москва" } },
  { _id: "1234567891", name: { en: "New York", ru: "Нью-Йорк" } },
  { _id: "1234567892", name: { en: "London", ru: "Лондон" } }
];

describe("Locations", () => {
  it("returns empty, if data is missing", () => {
    const result = locationsList([], "he");
    expect(result).toStrictEqual([]);
  });
  it("returns empty, if language is missing is missing", () => {
    const result = locationsList([], "");
    expect(result).toStrictEqual([]);
  });
  it("returns empty, if language is not found", () => {
    const result = locationsList(testData, "he");
    expect(result).toStrictEqual([]);
  });
  it("returns array of sorted locations, when the language is specified", () => {
    const result = locationsList(testData, "ru");
    expect(result).toStrictEqual([
      {label: "Лондон", value: "1234567892"},
      {label: "Москва", value: "1234567890"},
      {label: "Нью-Йорк", value: "1234567891"}
  ]);
  });
});
