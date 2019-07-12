import React from "react";

import style from "./style/Category.module.scss";

const Category = (props: { category: string }) => (
  <h5 id='category' className={style.category}>
    {props.category}
  </h5>
);

export default Category;
