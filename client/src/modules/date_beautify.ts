import data from "../data/translation.json";

import { indexedObjAny } from "../store/types";

const dataFile: indexedObjAny = data;

/** Function to fetch from the data proper month text
 *
 * @param {string} language - Language of the text
 * @param {number} month - Month ID (array ID, not actual ID)
 *
 * @returns {string} - Returns month name, i.e. "May"
 */
const getMonth = (language: string, month: number): string =>
  dataFile.language[language].months[month];

/** Function to process date to make it look like "May 16, 2019"
 *
 * @param {string} date - Date string to process
 * @param {string} language - Language to use
 *
 * @returns {string} - Returns either empty line, if all the requirements are not satisfied or string with date
 */
const dateBeautify = (date: string, language: string, brief?: boolean) => {
  const parsed = new Date(Date.parse(date));
  // if empty on absent - return empty
  if (
    (!date && !language) ||
    date === "" ||
    language === "" ||
    parsed.toString() === "Invalid Date"
  ) {
    return "";
  } else if (brief) {
    const calcMonth = parsed.getMonth() + 1;
    const month = calcMonth < 10 ? `0${calcMonth}` : calcMonth;
    return `${parsed.getDate()}/${month}/${parsed.getFullYear()}`;
  } else {
    let langRequest = !Object.keys(data.language).includes(language)
      ? "עב"
      : language;

    return `${getMonth(
      langRequest,
      parsed.getMonth()
    )} ${parsed.getDate()}, ${parsed.getFullYear()}`;
  }
};

export default dateBeautify;
