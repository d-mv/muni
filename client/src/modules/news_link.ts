const newsLink = (link: string, news: any) => {
  let linkToReturn = link;
  const linkElements = link.split(":");
  if (linkElements[0] === "news") {
    const newsFiltered = news.filter((el: any) => el._id === linkElements[1]);
    linkToReturn = `News: ${newsFiltered[0].title}`;
  }
  return linkToReturn;
};

export default newsLink;
