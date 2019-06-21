import { indexedObj } from "../store/types";

export const getCategories = (
  catArray: Array<any>,
  language: string
): Array<indexedObj> => {
  let categories: Array<indexedObj> = [];
  catArray.map((cat: any) => categories.push({ value: cat._id, label: cat[language] }));
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
