import React from "react";

import styles from "./style/Card.module.scss";

/**
 * React JSX component to wrap card
 *
 * @param {object} props - Children to display, direction, id
 *
 * @returns {JSX.Element}
 *
 */
const Card = (props: {
  direction: string;
  children: any;
  id: string;
  margin?: number;
  action: () => void;
}) => {
  const cardStyle = props.direction === "rtl" ? styles.cardRTL : styles.card;
  const marginAdjust = {
    marginTop: props.margin || 0
  };
  return (
    <article
      id={props.id}
      className={cardStyle}
      style={props.margin ? marginAdjust : {}}
      onClick={() => props.action()}>
      {props.children}
    </article>
  );
};

export default Card;
