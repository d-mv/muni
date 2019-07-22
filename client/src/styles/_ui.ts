import {
  darkTransLight,
  grey,
  primary,
  primaryLight,
  secondary,
  dark,
  darkTrans,
  white,
  secondaryLight
} from "./_colors";

// Shadows
export const cardShadow = `0 5px 10px 10px ${darkTransLight}, 0 1px 2px ${darkTransLight}`;
export const buttonShadow = (color: string) => `0 5px 10px 3px ${color}`;
export const pageShadow = `0 3px 10px 5px ${darkTrans}`;
export const pageShadowOpp = `0 -3px 10px 5px ${darkTrans}`;

// Borders
export const radiusMin = `.4rem`;
export const radiusMed = `.8rem`;
export const radiusLarg = `2rem`;
export const borderPost = `.1rem solid ${grey}`;
export const borderPrimary = `.1rem solid ${primary}`;
export const borderPrimaryLight = `.4rem solid ${primaryLight}`;
export const borderSecondary = `.1rem solid ${secondary}`;
export const borderSecondaryLight = `.4rem solid ${secondaryLight}`;
export const borderDark = `.1rem solid ${dark}`;
export const borderPage = `0.3rem solid ${white}`;
