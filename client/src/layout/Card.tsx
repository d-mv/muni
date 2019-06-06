import React from "react";

import style from "../styles/Card.module.scss";

/**
 * React JSX component to wrap card
 *
 * @param {object} props - Children to display, direction, id
 *
 * @returns {JSX.Element}
 *
 */
const Card = (props: { direction: string; children: any; id: string }) => {
  const cardStyle = props.direction === "rtl" ? style.cardRTL : style.card;
  return (
    <article id={props.id} className={cardStyle}>
      {props.children}
    </article>
  );
};

export default Card;
