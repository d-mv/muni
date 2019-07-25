const imageUrl = (url: string) => {
  if (url.split(":")[0] === "data") return url;
  const width = window.outerWidth;
  const settings = `/upload/c_thumb,w_${width}/`;
  const split = url.split("/upload/");

  return `${split[0]}${settings}${split[1]}`;
};

export default imageUrl;
