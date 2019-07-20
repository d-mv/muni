import {
  darkTransLight,
  grey,
  primary,
  primaryLight,
  secondary,
  dark,
} from "./_colors";

// Shadows
export const cardShadow = `0 5px 10px 10px ${darkTransLight}, 0 1px 2px ${darkTransLight}`;
export const buttonShadow = (color:string) => `0 5px 10px 3px ${color}`

// Borders
export const radiusMin = `.4rem`;
export const radiusMed = `.8rem`;
export const radiusLarg = `2rem`;
export const borderPost = `.1rem solid ${grey}`;
export const borderPrimary = `.1rem solid ${primary}`;
export const borderPrimaryLight = `.4rem solid ${primaryLight}`;
export const borderSecondary = `.1rem solid ${secondary}`;
export const borderDark = `.1rem solid ${dark}`;
// export const borderGrey = `.1rem solid ${grey}`;

