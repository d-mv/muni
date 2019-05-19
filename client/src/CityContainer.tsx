import React from "react";

import City from "./components/City";

import style from "./CityContainer.module.scss";

const CityContainer = () => {
  return (
    <main className={style.horizontalScrollWrapper}>
      <City city='Haifa' />
      <City city='Tel-Aviv' />
      <City city='Jerusalem' />;
    </main>
  );
};

export default CityContainer;
