import { newPostTYPE } from "../src/types";
/**
 * Votes fields
 * @typedef {Object} votesTYPE
 * @property {number} up
 * @property {number} down
 */
/**
 * Post fields
 * @typedef {Object} newPostTYPE
 * @property {string} title
 * @property {string} text
 * @property {string} photo
 * @property {string} link
 * @property {string} type
 * @property {string} newsId
 * @property {string} createdBy
 * @property {boolean} status
 * @property {votesTYPE} votes
 */
/**
 * Function to check new post fields, to ensure all are available and not empty
 * @function checkPostFields
 * @param {newPostTYPE} post
 * @return {boolean} - Returns if true or not
 */
const checkPostFields = (post: newPostTYPE): boolean => {
  // the qty of top-level keys should be 8
  if (Object.keys(post).length !== 8) {
    return false;
  } else {
    // default set of keys for the post
    const defaultSetOfKeys = [
      "title",
      "text",
      "photo",
      "link",
      "type",
      "newsId",
      "status",
      "votes"
    ];
    // score must be 9
    let score = 0;
    // go through the array with keys and check each element
    defaultSetOfKeys.forEach((key: string) => {
      // @ts-ignore
      const value = post[key];
      // 'votes' has 2nd-level keys
      if (key === "votes") {
        Object.keys(value).forEach((voteKey: string) => {
          if (typeof value[voteKey] === "number") score += 1;
        });
      } else if (key === "status") {
        if (typeof value === "boolean") score += 1;
      } else {
        if (value) {
          if (typeof value === "string" && value.length > 0) score += 1;
        }
      }
    });
    return score === 9;
  }
};

export default checkPostFields;
