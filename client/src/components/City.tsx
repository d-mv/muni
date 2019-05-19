import React from "react";
import { useSwipeable } from "react-swipeable";

import { scrollCalculator } from "../modules/scroll_calc";
import "../styles/City.module.scss";

const locations: { [index: string]: any } = {
  Haifa: {
    url:
      "https://res.cloudinary.com/diciu4xpu/image/upload/v1558177726/muni/cities/city_haifa.jpg",
    lang: { en: "Haifa", he: "חיפה" }
  },
  "Tel-Aviv": {
    url:
      "https://res.cloudinary.com/diciu4xpu/image/upload/v1558177721/muni/cities/city_tel-aviv.jpg",
    lang: { en: "Tel-Aviv", he: "תל-אביב" }
  },
  Jerusalem: {
    url:
      "https://res.cloudinary.com/diciu4xpu/image/upload/v1558177724/muni/cities/city__jerusalem.jpg",
    lang: { en: "Jerusalem", he: "ירושלים" }
  }
};

const City = (props: { city: string }) => {
  const [city, setCity] = React.useState(props.city);
  const [cityId, setCityId] = React.useState(
    Object.keys(locations).indexOf(props.city)
  );
  const [lang, setLang] = React.useState("he");

  const names = Object.keys(locations);

  const swiping = (direction: any) => {
    const id = scrollCalculator(direction, cityId, names.length - 1);
    setCityId(id);
    setCity(names[id]);
  };
  const handlers = useSwipeable({
    onSwipedLeft: eventData => swiping("LEFT"),
    onSwipedRight: eventData => swiping("RIGHT"),
    preventDefaultTouchmoveEvent: true
  });
  const background = {
    background: `rgba(0, 0, 0, 0) url(${
      locations[city].url
    }) no-repeat scroll center center / cover`
  };
  return (
    <main style={background}>
    {/* <main {...handlers} style={background}> */}
      <div />
      <h1>{locations[`${city}`].lang[`${lang}`]}</h1>
    </main>
  );
};

export default City;
