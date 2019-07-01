import React from "react";

import styleFactory from "../modules/style_factory";

import styles from "./style/Card.module.scss";

/**
 * React JSX component to wrap card
 * @param {object} props - Children to display, direction, id
 * @returns {JSX.Element}
 */
const Card = (props: {
  direction: string;
  children: any;
  id: string;
  margin?: number;
  action: () => void;
}) => (
  <article
    id={props.id}
    className={styles[styleFactory("card", props.direction)]}
    style={{ marginTop: props.margin }}
    onClick={() => props.action()}>
    {props.children}
  </article>
);

export default Card;
