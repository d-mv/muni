import React from "react";

import Category from "../../Card/components/Category";

import Section from "../../../layout/Section";

import styles from './style/TopBlock.module.scss'

const TopBlock = (props: {
  category: string;
  title: string;
  numbersLine: React.ClassicElement<any>;
}) => {
  return (
    <Section narrow>
      <Category category={props.category} />
      <h3 className={styles.title}>{props.title}</h3>
      {props.numbersLine}
    </Section>
  );
};

export default TopBlock;
