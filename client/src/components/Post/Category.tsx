import React from "react";

import style from "../../styles/Category.module.scss";

const Category = (props: { category: string }) => (
  <p id='category' className={style.category}>
    {props.category}
  </p>
);

export default Category;
