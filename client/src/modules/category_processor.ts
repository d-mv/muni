import { indexedObj } from "../store/types";

export const getCategories = (
  catArray: any,
  language: string
): Array<indexedObj> => {
  let categories: Array<indexedObj> = [];
  Object.keys(catArray).map((key: string | number) =>
    categories.push({
      value: catArray[key]._id,
      label: catArray[key].name[language]
    })
  );
  return categories;
};

export const categoryIdToName = (
  categories: Array<any>,
  language: string,
  id: string
) => {
  let catArray = getCategories(categories, language);
  let result = "";
  catArray.forEach((el: indexedObj) =>
    el.value === id ? (result = el.label) : null
  );
  return result;
};
