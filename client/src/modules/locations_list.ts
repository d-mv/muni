import { indexedObj } from "../store/types";

/**
 * Function to process locations object to provide array of location names
 * @function locations
 * @param {Array} locations
 * @param {string} language
 * @returns {Object} - in the form of {location:id}
 */
export const locationsList = (
  locations: Array<any> = [],
  language: string = ""
): Array<any> => {
  console.log(locations)
  // return empty array if empty params supplied
  if (locations.length === 0 || language === "") return [];
  // check if names contain language requested
  const check = locations.filter(el => Object.keys(el.name).includes(language));
  // return empty array if not
  if (check.length !== locations.length) return [];

  // process the names as per language request
  const unsortedResult: indexedObj = {};
  const locationsList: Array<string> = [];
  locations.map(el => {
    // add to unsorted list
    unsortedResult[el.name[language]] = el._id;
    // add to array of locations to be sorted
    locationsList.push(el.name[language]);
  });
  // sort locations and push appropriate pair to the result
  const result: Array<indexedObj> = [];
  locationsList.sort().map((el: any) => {
    // add a pair to the resulting array
    result.push({ value: unsortedResult[el], label: el });
  });
  return result;
};

export default locationsList;
