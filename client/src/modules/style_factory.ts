
/**
 * Function to convert style nme to right-to-left variant
 * @param {string} style - Original style name
 * @param {string} direction - ltr/rtl
 */
const styleFactory = (style: string, direction: string) => {
  if (!style || !direction || typeof style !== "string") {
    return "";
  } else if (typeof direction !== "string" || direction !== "rtl") {
    return style;
  } else {
    return `${style}RTL`;
  }
};

export default styleFactory;
