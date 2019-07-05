import React from "react";

import Category from "../../../components/Card/components/Category";

import Section from "../../../layout/Section";

import styles from "./style/TopBlock.module.scss";

export const TopBlock = (props: {
  category?: string;
  title: string;
  numbersLine?: React.ClassicElement<any>;
  muni?: boolean;
}) => (
  <Section narrow>
    {props.muni ? null : <Category category={props.category || ""} />}
    <h3 className={styles.title}>{props.title}</h3>
    {props.numbersLine}
  </Section>
);
